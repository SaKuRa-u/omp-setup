@echo off
setlocal
set "HYPERFRAMES_NO_TELEMETRY=1"
set "DO_NOT_TRACK=1"
set "HYPERFRAMES_NO_UPDATE_CHECK=1"
set "HYPERFRAMES_NO_AUTO_INSTALL=1"
set "HYPERFRAMES_CONFIG_DIR=%~dp0state"
set "HYPERFRAMES_CACHE_DIR=%~dp0cache"
set "HYPERFRAMES_FONT_CACHE_DIR=%~dp0cache\fonts"
set "HYPERFRAMES_BROWSER_PATH=C:\Users\Indrimeilla-PC\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe"
set "CI=1"
"C:\Program Files\nodejs\node.exe" "%~dp0node_modules\hyperframes\bin\hyperframes.mjs" %*
exit /b %errorlevel%
