# Autocomplete Challenge

Build with Typescript, Mobx, Styled Components.

# Things I could do better:

1. There is a hack with regards to clicking on the setState function inside the input. Currently the setState will be called before the click event which causes the flag to flip and unmounts the component. 

2. There are potential race conditions on the autocompletes themselves, didnt address this for simplicities sake but there are a few potential solutions. Throttling the calls for example or matching it based on the current query etc.