param(
  [Parameter(Mandatory=$true)][ValidateSet('set','get','status')][string]$Action,
  [Parameter(Mandatory=$true)][ValidateSet('supermemory','context7')][string]$Provider
)
$ErrorActionPreference = 'Stop'
$stage = 'initialize'
try {
  Add-Type -AssemblyName System.Security
  $root = Join-Path $env:USERPROFILE '.omp\agent\ecosystem\secrets'
  $file = Join-Path $root ($Provider + '.dpapi')
  if ($Action -eq 'status') {
    [Console]::Out.Write($(if ([IO.File]::Exists($file)) { 'stored' } else { 'missing' }))
    exit 0
  }
  if ($Action -eq 'set') {
    $stage = 'exists'
    if ([IO.File]::Exists($file)) { throw 'already_stored' }
    $stage = 'stdin'
    $value = [Console]::In.ReadToEnd().Trim()
    if ($value.Length -lt 12 -or $value.Contains("`n") -or $value.Contains("`r")) { throw 'invalid_input' }
    $stage = 'encrypt'
    $plain = [Text.Encoding]::UTF8.GetBytes($value)
    $encrypted = [Security.Cryptography.ProtectedData]::Protect($plain, $null, [Security.Cryptography.DataProtectionScope]::CurrentUser)
    [Array]::Clear($plain, 0, $plain.Length)
    $value = $null
    $stage = 'directory'
    [IO.Directory]::CreateDirectory($root) | Out-Null
    $stage = 'acl'
    $sid = [Security.Principal.WindowsIdentity]::GetCurrent().User
    # Keep the owner/group and persist access-rule changes through DirectoryInfo.
    # PowerShell Set-Acl requests privileges this non-elevated process lacks.
    $acl = Get-Acl -LiteralPath $root
    $acl.SetAccessRuleProtection($true, $false)
    foreach ($rule in @($acl.Access)) { [void]$acl.RemoveAccessRuleAll($rule) }
    $acl.AddAccessRule((New-Object Security.AccessControl.FileSystemAccessRule($sid, 'FullControl', 'ContainerInherit,ObjectInherit', 'None', 'Allow')))
    $acl.AddAccessRule((New-Object Security.AccessControl.FileSystemAccessRule('SYSTEM', 'FullControl', 'ContainerInherit,ObjectInherit', 'None', 'Allow')))
    (Get-Item -LiteralPath $root).SetAccessControl($acl)
    $stage = 'write'
    $stream = [IO.File]::Open($file, [IO.FileMode]::CreateNew, [IO.FileAccess]::Write, [IO.FileShare]::None)
    try { $stream.Write($encrypted, 0, $encrypted.Length) } finally { $stream.Dispose() }
    [Console]::Out.Write('stored')
    exit 0
  }
  $stage = 'read'
  if (-not [IO.File]::Exists($file)) { throw 'missing' }
  $encrypted = [IO.File]::ReadAllBytes($file)
  $stage = 'decrypt'
  $plain = [Security.Cryptography.ProtectedData]::Unprotect($encrypted, $null, [Security.Cryptography.DataProtectionScope]::CurrentUser)
  try { [Console]::Out.Write([Text.Encoding]::UTF8.GetString($plain)) }
  finally { [Array]::Clear($plain, 0, $plain.Length) }
} catch {
  [Console]::Error.Write(([ordered]@{ error = 'credential_operation_failed'; stage = $stage; category = $_.Exception.GetType().Name } | ConvertTo-Json -Compress))
  exit 1
}
