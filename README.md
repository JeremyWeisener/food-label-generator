# food-label-generator
A simple food label generator utilizing the USDA API via Mulesoft Anypoint Studio and a basic HTML/CSS/JS frontend with Bootstrap.


## Getting started

### Download files
1. Install [Mulesoft's Anypoint Studio](https://www.mulesoft.com/platform/studio)
2. Navigate to `C:\Users\<your username>\AnypointStudio\studio-workspace`
3. Perform `git clone https://github.com/JeremyWeisener/food-label-generator.git` in the _/studio-workspace_ directory

### Setup environment
1. Signup for an API key at [https://fdc.nal.usda.gov/api-key-signup.html](https://fdc.nal.usda.gov/api-key-signup.html)
2. Put the API key in the `apikeys:usda` field in the `keys.yaml` file located in `/food-label-generator/src/main/resources`
##### The base file path is assumed to be `C:\Users\<your username\`
3. Make sure the project is located in `C:\Users\<your username>\AnypointStudio\studio-workspace\food-label-generator\` otherwise the relative paths used for the files will fail.
-- This can be adjusted in the `/food-label-generator/src/main/mule/nutrition.xml` by updating the `<file:read />` tags

### Running the project
1. Open _Anypoint Studio_ and open the project via the `File > Open Project From File System...` option.
2. Navigate to and select the _food-label-generator_ project folder.
3. Click the green Play button on the Shortcut row to start the project.
4. Wait for project to completely start.
5. Navigate to [http://localhost:8081/](http://localhost:8081/) in your browser.

### Usage
1. Find a food product UPC and type it in, and click submit.
2. View data
