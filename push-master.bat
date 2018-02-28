git checkout master
git branch --set-upstream-to origin/development
git pull
git branch --set-upstream-to origin/master
git push
ng build --prod
RMDIR "z:\hosting" /s /q
MKDIR "z:\hosting"
xcopy dist "z:\hosting\"
xcopy dist\assets "z:\hosting\assets\" /i
git checkout development
z:
cd development/server-status-app
git pull
cmd /k