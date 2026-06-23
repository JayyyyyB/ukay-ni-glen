@echo off
SET GIT="C:\Users\jay r balbuena\AppData\Local\GitHubDesktop\app-3.5.3\resources\app\git\cmd\git.exe"
SET DIR="c:\Users\jay r balbuena\Documents\ukay-ukay"

echo Initializing git repository...
%GIT% -C %DIR% init

echo Staging all files...
%GIT% -C %DIR% add .

echo Committing...
%GIT% -C %DIR% commit -m "fix: resolve build errors for Vercel deployment"

echo Done! Now you need to push to GitHub.
echo Please open GitHub Desktop to push.
pause
