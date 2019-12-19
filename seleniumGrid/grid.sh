# Selenium Grid simply helps you distribute tests across machines transparently

# using docker to manage multiple nodes concurrently
# does this work when the build agent is also a docker container?

# create a shared network for the hub and nodes
docker network create grid

# create the hub, expose it locally on port 4444
docker run -d -p 4444:4444 --net grid --name selenium-hub selenium/hub:3.141.59-yttrium

# create the desired number of nodes
docker run -d --net grid -e HUB_HOST=selenium-hub -v /dev/shm:/dev/shm selenium/node-chrome:3.141.59-yttrium
# docker run -d --net grid -e HUB_HOST=selenium-hub -v /dev/shm:/dev/shm selenium/node-chrome:3.141.59-yttrium

# probably better to move the above config into a docker-compose file for easy set up and tear down

# http://localhost:4444/status

# alternatively you can just use selenium jar to start the node for you but you have to run it as background process

# For managing test execution, defer to the test runner aka cucumber
# cucumber has CUCUMBER_SLAVE_ID
# use this to manage launch_url and to launch chromedriver on a different port
# should be able to get the correct tab based on port?
# also to determine port?

