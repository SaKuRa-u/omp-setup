@echo off
setlocal
set "CLI_HUB_NO_ANALYTICS=1"
set "HOME=%~dp0state"
set "USERPROFILE=%~dp0state"
set "PATH=%~dp0venv\Scripts;%PATH%"
"%~dp0venv\Scripts\cli-hub.exe" %*
exit /b %errorlevel%
