## Computer Setup

Set up your computer with the following tools:

Latest version of Ruby (for Sass, and other tools) Node.js, PostgreSQL,
MongoDB, Redis,

Editors: We use [Atom.io](http://atom.io) or Sublime Text 3 in class, and I'm betting you already do too
(unless you rock Vim or Emacs). Sublime Text has a fully-featured, unlimited time Trial mode.

_Optional_: if you are coming from an IDE like Visual Studio or Eclipse, you
may like [WebStorm](http://www.jetbrains.com/webstorm/) (trial version) better
than Sublime Text because of the autocompletion and debugging tools. It's also
cheaper for an academic license ($29 vs $79)

And if you're a strict proponent of open source, or want to dogwood and
customize your editor in JavaScript, there are two great free editors:
[Brackets](http://brackets.io) and [Light Table](http://www.lighttable.com).

#### Sign up for these free web services:

  * GitHub (you may have this already but there is also <https://education.github.com/discount_requests/new> try it while you're here)
  * Pivotal Tracker <https://www.pivotaltracker.com/faq#istrackerreallyfreeforpublicprojectsindividualusenonprofitsandeducators>

#### Mac OS:

* Homebrew <http://brew.sh> Note: the instructions are at the end of the web page.

* rbenv, ruby-build, ruby 2.1.1 and the sass gem
    * `brew doctor`
    * `brew update`
    * `brew install rbenv ruby-build rbenv-gem-rehash`
    * `echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile`
    * `echo 'eval "$(rbenv init -)"' >> ~/.bash_profile`
    * `rbenv install 2.1.1`
    * `rbenv global 2.1.1`
    * `gem install sass`
    * NOT use sudo to install ruby or gems
    * if you get a permissions error when installing sass, somehow system ruby is still active. Try restarting your terminal, or if it persists, check for the items above in your .bash_profile file

* Node.js
    * `brew install nvm`
    * `nvm install 0.10`
    * `nvm alias default 0.10`
    * add `source $(brew --prefix nvm)/nvm.sh` to your .bash_profile or .zshrc
    * Install some commonly used packages with npm: `npm -g install grunt-cli jshint`
	* Reference the [NVM README](https://github.com/creationix/nvm/blob/master/README.markdown) if you get stuck

* PostgreSQL
    * Follow Ivan's blog post: <https://www.codefellows.org/blogs/how-to-install-postgresql>


* Pick a programmer's editor:
    * Try out http://atom.io and ask around for an invite.
    * or go with the crowd and choose Sublime Text 3:
      * <http://www.sublimetext.com/3>
      * Package Control: <https://sublime.wbond.net/installation>
    * Or, try Adobe's open source http://brackets.io
    * Which one to choose? I like Atom.io and Brackets because you can customize them with JavaScript. Customizing Sublime requires knowledge of Python.

* MongoDB
    * `brew install mongodb`
    * Follow the directions that homebrew tells you. You can always do `brew info mongo`
    * you can start mongo with `brew services start mongo`
    * you can stop redis with `brew services stop redis`

* Redis
    * `brew install redis`
    * Follow the directions that homebrew tells you. You can always do `brew info redis`
    * you can start redis with `brew services start redis`
    * you can stop redis with `brew services stop redis`

* Heroku Toolbelt
     * `brew install heroku-toolbelt`

### Ubuntu:

  * No need for homebrew you already have a perfectly good [package management system](https://help.ubuntu.com/community/AptGet/Howto).
  * In your terminal preferences make sure that "Run Command as a login shell is an enabled profile preferences" check these two screenshots: <http://cl.ly/image/220M3f093v2M>  <http://cl.ly/image/3i2O0y0A3e04>
  * rbenv, ruby-build, and ruby: <https://www.digitalocean.com/community/articles/how-to-install-ruby-on-rails-on-ubuntu-12-04-lts-with-rbenv--2>
    *  NOTE you __DO NOT__ have to _buy_ a digital ocean server, this is instructions for how to install __LOCALLY__. __Ignore__ the create a server droplet step
    * NOTE replace 1.9.3 with the latest version of ruby: 2.1.1
  * gem install sass // DO NOT use sudo to install gems
  * node.js: <https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager> It's probably best to use Chris Lea's repository, as it is the most up-to-date.
  * Install Grunt-CLI (command line interface)  `npm -g install grunt-cli`
  * PostgreSQL
    * Follow Ivan's blog post: <https://www.codefellows.org/blogs/how-to-install-postgresql>
    * no need to install the pg gem - you won't be connecting to Postgres from ruby here.
  * Sublime Text 3
    * <http://docs.sublimetext.info/en/latest/getting_started/install.html>
  * MongoDB - <https://www.digitalocean.com/community/articles/how-to-install-mongodb-on-ubuntu-12-04> NOTE you DO NOT have to buy a digital ocean server, this is instructions for how to install LOCALLY. Ignore the create a server droplet step
  * Redis - <https://library.linode.com/databases/redis/ubuntu-12.04-precise-pangolin> same as above
  * Heroku Toolbelt - sudo apt-get install heroku-toolbelt
