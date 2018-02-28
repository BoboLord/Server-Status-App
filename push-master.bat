git checkout master
git branch --set-upstream-to origin/development
git pull
git branch --set-upstream-to origin/master
git push
call npm run build

timeout 5 >nul
REM RMDIR "z:\hosting" /s /q
REM MKDIR "z:\hosting"
DEL /S /Q "z:\hosting"
DEL /S /Q "z:\hosting\assets\"
xcopy dist "z:\hosting\"
xcopy dist\assets "z:\hosting\assets\"
git checkout development
z:
cd development/server-status-app
git pull
cmd /k