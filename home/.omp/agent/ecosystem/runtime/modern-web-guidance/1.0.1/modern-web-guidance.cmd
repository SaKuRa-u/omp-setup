@echo off
setlocal
set "DISABLE_TELEMETRY=1"
set "ENABLE_FILE_LOGGING=false"
"C:\Program Files\nodejs\node.exe" "%~dp0package\skills\modern-web-guidance\modern-web.mjs" %*
exit /b %errorlevel%
