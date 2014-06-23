# How to host a NodeJS app on an EC2 Ubuntu Server

I will take you through the process of setting up your first server on an Amazon
Elastic Compute Cloud (EC2) Ubuntu Server.

## Sign up for Amazon Web Services Free Tier
- Tip: sign up with a new email if your account is older than a year

## Create a New Key Pair or Upload an SSH Public Key
- Visit [aws ssh key pairs](https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#KeyPairs:)
- I have found it's easier to upload a public key that you've created on your own
machine. Visit [Github Help](https://help.github.com/articles/generating-ssh-keys)
if you need help creating your own public/private key pair.

## Find and launch an AMI
- Google AWS Marketplace
- Search for Ubuntu
- [I chose this 64 bit image](https://aws.amazon.com/marketplace/pp/B00JV9JBDS/ref=srh_res_product_title?ie=UTF8&sr=0-3&qid=1402960705314),  you should too for this tutorial.
- click the big yellow continue button
- accept default options, except:
	- make sure **t1-micro** is selected in EC2 Instance Type
- Launch with 1-Click

## Connect to your EC2 Machine Instance
- Visit your [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:)
- instance state will be 'running' eventually
- find Public IP column and note address
- `ssh ubuntu@PUBLIC-IP-ADDRESS`
	- make an A record on your domain in [Route 53](http://aws.amazon.com/route53/)
	 for convenience

## Install Prerequisites and Common Packages

The `-y` option is helpful because apt won't for wait for you to press 'y', it
will just install the packages. Very helpful for when you're trying to script
this entire process.

```
sudo apt-get update && sudo apt-get install -y build-essential g++ tmux
```

## Install Node, Build from Source

```
curl -O http://nodejs.org/dist/v0.10.29/node-v0.10.29.tar.gz
tar -xvzf node-v0.10.29.tar.gz
cd node-v0.10.29
./configure --prefix=/opt/node
make
sudo mkdir -p /opt/node
sudo chown -R ubuntu.ubuntu /opt/node
make install
```

Add node to your path in `~/.bashrc`:

`echo "export PATH=/opt/node/bin:$PATH" >> ~/.bashrc`

Then reload `.bashrc`

`source ~/.bashrc`

Double check to see that node is in your path:

`which node` => should be `/opt/node/bin/node`

Now, we need to add node to root's path too. To do this, we will need to use the
`visudo` command to edit the secure path.

`sudo visudo`

edit your `Defaults  secure_path=` line, around the thrird line, to look like:

`Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/opt/node/bin"`

The key here is to put the path to node at the end of the secure path.

Go ahead and save the file.

## Install the Latest MongoDB
Follow the directions here:
http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

To summarize:
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install mongodb-org
```

## Install the Latest Redis

Luckily, Chris Lea keeps an up-to-date ubuntu ppa available.

```
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install redis-server -y
```

## Install the Latest Git
```
sudo add-apt-repository ppa:git-core/ppa
sudo apt-get update
sudo apt-get install git -y
```

### Test MongoDB is running

```
mongo
show dbs
```
- ctrl-d to exit

### Test Redis is running
- `redis-cli ping` --> should see  `PONG`

## A Neat Trick to Find the External IP
You can always find the External IP address of your server in the EC2 Dashboard,
but I frequently use this shortcut from the command line:

`curl icanhazip.com`

## Bower ALL THE THINGS
I mean, install bower and any other global npm packages you use frequently.

`npm -g install bower grunt-cli`

## Clone Your App and Install NPM and Bower Packages

I'll use one of our example apps. 

Make sure you're in the ubuntu home directory: `/home/ubuntu` 

```
cd
git clone https://github.com/codefellows/javascript-b15-notes.git notes
cd notes
npm install && bower install
```

## Launch the server on Port 80

To launch your app, and bind on any port under 1000, you need to use `sudo` to 
escalate to root privelege.

```
sudo -i
PORT=80 node server.js
```
visit the site http://YOUR-IP-HERE

This will do in a pinch, but it's not a professional setup. What happens if your
server reboots? You want something to re-start the server automatically.

## Install the Forever NPM Package

`npm -g install forever`

Create `/etc/init/notes.conf`

You can always use `nano` if you are [afraid of Vim&hellip;](http://vim-adventures.com)

`/etc/init/notes.conf`:
```
start on startup
stop on shutdown

expect fork

script
  PATH=/opt/node/bin:$PATH
  exec forever start /home/ubuntu/notes/server.js
end script

pre-stop script
  PATH=/opt/node/bin:$PATH
  exec forever stop /home/ubuntu/notes/server.js
end script
```

Then `sudo start notes` to start the app

You can use use `sudo status notes` to see the status of the service.
