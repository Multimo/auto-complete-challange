# Autocomplete Challenge

Build with Typescript, Mobx, Styled Components.

# Things I could do better:

1. There is a hack with regards to clicking on the setState function inside the input. Currently the setState will be called before the click event which causes the flag to flip and unmounts the component. So i have a timeout to get the other function to fire first. This could be better.
