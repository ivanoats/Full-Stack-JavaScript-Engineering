# Installing Node from Source

This is only if you need to, generally just on Linux systems.

- Goto the node website
- Click download
- Click the source download
- Go to the directory where you downloaded the source and do:
```
tar -xzvf <the node tar.gz you downloaded>
cd <node directory>
./configure --prefix=~/.node
make && make install
```

- add the following to your shell startup scripts (.bash_profile, .bashrc or .profile)
```
export PATH=$PATH:$HOME/.node/bin
export NODE_PATH=$HOME/.node/lib/node_modules
```

## Making sure it works

- Restart your shell and the command `node -v` should print out the current node
version.
- You should now be able to install Node packages globally without `sudo`. Try
`npm -g install jshint`. If that works, without any EACCESS errors, you're good!
