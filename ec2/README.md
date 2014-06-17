# NodeJS EC2 Demo

## Sign up for Amazon Web Services Free Tier
- sign up with a new email if your account is older than a year

## Create a New Key Pair or Upload an SSH Public Key
- Visit [aws ssh key pairs](https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#KeyPairs:)

## Find and launch an AMI
- Google AWS Marketplace
- Search for Ubuntu
- [I chose this 32 bit image](https://aws.amazon.com/marketplace/pp/B00JV9JBDS/ref=srh_res_product_title?ie=UTF8&sr=0-3&qid=1402960705314),  you should too for this tutorial.
- click the big yellow continue button
- accept default options, except:
	- make sure micro is selected in EC2 Instance Type
- Launch with 1-Click

## Connect to your EC2 Machine Instance
- Visit your [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:)
- instance state will be 'running' eventually
- find Public IP column and note address
- `ssh ubuntu@PUBLIC-IP-ADDRESS`
	- make an A record on your domain in Route 53 for convenience

## Install prerequisites, common packages

```
sudo apt-get install build-essential g++
```

## Install Node, Build from Source

```
curl -O http://nodejs.org/dist/v0.10.29/node-v0.10.29.tar.gz
tar -xvzf node-v0.10.29.tar.gz
cd node-v0.10.29
./configure && make && sudo make install
```

## Install MongoDB, Redis, and Git
`sudo apt-get install mongodb redis-server git -y`

### Test MongoDB is running

```
mongo
show dbs
```
- ctrl-d to exit

### Test Redis is running
- `redis-cli ping` --> should see  `PONG`

## A Neat Trick to Find the External IP
`curl icanhazip.com`

## Bower ALL THE THINGS
`sudo npm -g install bower grunt-cli`

## Clone the Notes App
Make sure you're in the ubuntu home directory: 

```
cd
git clone https://github.com/codefellows/javascript-b15-notes.git notes
cd notes
npm install && bower install
```

## Launch the server on Port 80

To launch your app, and bind on any port under 1000, you need to use `sudo` to 
escalate to root privelege.

`sudo PORT=80 node server.js`

visit the site http://YOUR-IP-HERE

This will do in a pinch, but it's not a professional setup. What happens if your
server reboots? You want something to re-start the server automatically.

## Install the Forever npm package

`npm -g install forever`

Reference: https://www.exratione.com/2011/07/running-a-nodejs-server-as-a-service-using-forever/

