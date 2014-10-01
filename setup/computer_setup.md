## Computer Setup

Set up your computer with the following tools: A programmer's text editor, Node.js, MongoDB, and Redis.

* Pick a programmer's editor:
    * Tyler and I use [Vim](http://www.openvim.com/tutorial.html). We don't expect you to learn Vim in addition to everything in the bootcamp, but we will help you if you want to use it. Try `vimtutor` from the command line to start, or an [interactive tutorial](http://www.openvim.com/tutorial.html).
    * Sublime Text:
      * <http://www.sublimetext.com/3>
      * Required: Install Package Control: <https://sublime.wbond.net/installation>
      * Required: [Customize your Sublime Preferences](https://gist.github.com/ivanoats/9cd0cd84312e3aa29b0b)
    * Github's popular editor: http://atom.io
    * Adobe's open source http://brackets.io
    * [Light Table](http://www.lighttable.com).

    * Which one to choose? I like Atom, or Brackets, because you can customize them with JavaScript. Customizing Sublime requires knowledge of Python.

  * _Optional_: If you are coming from an IDE like Visual Studio or Eclipse, you
may like [WebStorm](http://www.jetbrains.com/webstorm/) (trial version) better
than a programmer's editor, because of the autocompletion, and debugging tools. It's also cheaper for an academic license ($29 vs $79)

* Totally Optional, but you may want a relational database. Only do this if you have time. I choose PostgreSQL:
    * Follow Ivan's blog post: <https://www.codefellows.org/blog/three-battle-tested-ways-to-install-postgresql>

* GitHub (you may have this already but there is also <https://education.github.com/discount_requests/new> try it while you're here)

#### Mac OS:

* Homebrew <http://brew.sh> Note: the instructions are at the end of the web page. Run `brew update && brew doctor` if you already have homebrew but haven't used it in a while.

* Node.js
    * `brew install node`
    * Install some commonly used packages with npm: `npm -g install grunt-cli jshint`



* MongoDB
    * `brew install mongodb`
    * Follow the directions that homebrew tells you. You can always do `brew info mongo` if you let the instructions scroll off the screen (tsk tsk, you need to read the terminal messages!)
    * you can start mongo with `launchctl start homebrew.mxcl.mongodb`
    * you can stop mongo with `launchctl stop homebrew.mxcl.mongodb`

* Redis
    * `brew install redis`
    * Follow the directions that homebrew tells you. You can always do `brew info redis`
    * you can start redis with `launchctl start homebrew.mxcl.redis`
    * you can stop redis with `launchctl stop homebrew.mxcl.redis`

* Heroku Toolbelt
     * `brew install heroku-toolbelt`

### Ubuntu:

  * No need for homebrew you already have a perfectly good [package management system](https://help.ubuntu.com/community/AptGet/Howto).
  * In your terminal preferences make sure that "Run Command as a login shell is an enabled profile preferences" check these two screenshots: ![screenshot of profile preferences](http://f.cl.ly/items/3u231q3t2127391L1X1J/Image%202014-02-10%20at%203.10.54%20PM.png) ![screenshot of run command as login shell](http://f.cl.ly/items/2D3F3n461g1J0h1i1d1Y/Image%202014-02-10%20at%203.11.11%20PM.png)

  * node.js: compile node from source, following the directions [here](install_node_from_source.md).
  * Install Grunt-CLI (command line interface)  `npm -g install grunt-cli`

  * MongoDB - Follow [MongoDB's article](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/).
  * Redis - <https://library.linode.com/databases/redis/ubuntu-12.04-precise-pangolin> same as above
  * Heroku Toolbelt - `sudo apt-get install heroku-toolbelt`
