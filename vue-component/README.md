# Web Component

With this assignment we will create a native Vue Component that will create an image slider (a.k.a. image carousel).

### Local Testing and Development Instructions

To test your code locally you must first install the dependencies. From within your project directory execute this command: 

```bash
npm install
```

Now that dependencies are installed you can test your code at any time with this command:

```bash
npm test
```

To help with the development of your web-component a small server has been set up. In the terminal, execute the command `npm start` to start the server. You should see output similar to this:

```bash
npm start

> web-component@1.0.0 start web-component
> node server/index.js

Server listening on port 33231
```

Notice the last line displays the port number that the server is listening on.

- Open your browser to `http://localhost:<port>` where `<port>` is the port that the server is running on.
- You will not need to restart the server while developing your web component.


### Objectives

- Create a custom Vue component
- Bind picture src and index to the component.
- Emit event from the component.

### Instructions

1. Locate the `public` directory within the project directory.

    - There is an `index.html` file. Do not alter this file.

        - It uses three image slider components.

        - Each component is provided an `index` attribute (that tells which image to show) as well as an `images` attribute that is an array of images. Only one image should show at a time.

        - Each component has an event listener (`v-on`) listening for the `index-change` event. Once received it updates it's own index value.

    - There is a `js/app.js` file. Do not alter tis file.

        - This defines the state for which images to use as well as what the index is. This state is fed into the `index.html` file.

    - There is a `components/image-slider.js` file. This is where you'll do all the work.

2. You're Vue image-slider component needs the following work done:

    - Finish the template. Use a `v-for` and `v-if` to show the correct image as determined by what the current `index` is set to.

    - Write the next method. This will need to increment the `index` by emitting an `index-change` event that has the new index value as it's parameter. If the last image is already selected then it should start over and select the first image.

    - Write the previous method. This will need to decrement the `index` by emitting an `index-change` event that has the new index value as it's parameter. If the first image is already selected then it should go to the end and select the last image.

    - Define an `index` property as a `Number`.

    - Define an `images` property as an `Array`.

3. Submit the assignment.