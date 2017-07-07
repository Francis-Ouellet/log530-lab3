### Themes Folder
This folder contains application specific themes. For example:

* Base Styles
* Fonts
* Metrics
* Colors

Files within this folders shall process general elements of the themes to make
ready to use when imported elsewhere in the app. They should encapsulate every
resources that can be considered as part of a theme like fonts and icons. A good
example is the `Icons.js` file that loads various icons in memory. This ensures
the encapsulation of this behaviour and it keeps the containers from behing huge.
