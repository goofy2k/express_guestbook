Guestbook example from Express in Action, p.45

planning to implement / learn about:

1. using git
2. using npm
3. convert from remote bootstrap css to local , if this is required for,...
4. using local custom.css with deltas from the original bootstrap css
5. location of css and access with the Express routers 
6. use of database (mysql as mongo installation still does not work on Raspbian Stretch)

Questions:

Re 1. Git: 	is the config according 'git config --global'  valid for all projects?
           	how to define e.g. a separate remote repository for an express project or all express projects
	   	you start a repository with 'git init project-name'. Where in the git status is this name?
		can you define different repositories for different projects?

		Partial answer: explicitely give the name of the right repository when you upload a commit to github with git push
		So with: git push https://github.com/goofy2k/express_guestbook.git

Re 2.		See the doc when you do it. You don't use it that often. It works!


Re 3. css	Customisation works, even if the original css is remote (as in the current app.
		Customize Bootstrap css by creating a custom.css in public/stylesheets
      		In the view (header.ejs) refer to it as /stylsheets/custom.css  (see 5).
      		custom.css defines the deltas in the bootstrap_xxx_yyy.css even if you use a remote file.
		Do NOT edit the original css !

      		See: https://uxplanet.org/how-to-customize-bootstrap-b8078a011203 

		Consider to use SASS to customize boorstrap css 's . See the above link.
Re 4. custom  	custom css is in public/stylesheets    editing of stylesheets is complicated. That will be another project!


Re 5. routing	When you define the folder public as the staticPath, it will be the root for accessing all static content
		This includes css in the folder public/stylesheets.   You should refer to e.g custom.css   as /stylesheets/custom.css
		So, without public in front of it.

		Load favicon.ico in /guestbook/public  but refer to it with /favicon.ico.  

Re 6. databese	Did a merge of the "user" app on pages 124 to 132 of "Express in action" with the guestbook app of
		pages 45 to 49 .  Moved the guestbook home page from / to /guestbook. it is in index.ejs.
		The homepage of the database app is in _index.ejs and must be linked to /
		You need to move the routers from app.js to routes.js.
		You also need to read pages 132 to and further, for more modifications
		
