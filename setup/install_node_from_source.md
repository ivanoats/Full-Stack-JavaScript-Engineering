# Installing Node from Source

This is only if you need to, generally just on Linux systems.

- Goto the node website
- Click [downloads](http://nodejs.org/download/)
- Click the **Source Code** download. Usually the last row. It will be a file like `http://nodejs.org/dist/v0.10.32/node-v0.10.32.tar.gz`

  The version # may be greater.

- Go to the directory where you downloaded the source and do:
```
tar -xvf <the node tar.gz you downloaded>
cd <node directory>
./configure --prefix=$HOME/.node
make && make install
```

- add the following to your shell startup scripts (.bash_profile, .bashrc or .profile)
```
export PATH=$PATH:$HOME/.node/bin
export NODE_PATH=$HOME/.node/lib/node_modules
```

or for fish, add the following to config.fish (~/.config/fish/config.fish)
```
set -gx PATH $PATH $HOME/.node/bin
set -gx NODE_PATH $HOME/.node/lib/node_modules
```

## Making sure it works

- Restart your shell and the command `node -v` should print out the current node
version.
- You should now be able to install Node packages globally without `sudo`. Try
`npm -g install jshint`. If that works, without any EACCESS errors, you're good!
