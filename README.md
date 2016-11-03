vue-drag-drop
=======

Vue.js Drag and Drop functionality.

## Installation

For now just put in your assets folder and call it in your html file.

## Usage

```html
<li
    v-for="(drink, drink_index) in drinks"
    :data-index="drink_index"
    v-drag-drop="{
        group: 'drink',
        drop: {
            css: 'drop',
            method: moveDrinkElement
        }
    }"
>
    ${ drink.name }
</li>
```

For now there are two parameters that `v-drag-drop` accepts.

### group

Group of the list of data. In example above, we have a list of data called `drinks` so we want the group named `drink`.

### drag and drop events

Parameters accepted:

* dragStart
* drag
* dragEnter
* dragOver
* dragLeave
* drop
* dragEnd

To use this, choose one of the parameters above and call a method to initiate the function.

Example 1

```html
<li
    v-for="(drink, drink_index) in drinks"
    :data-index="drink_index"
    v-drag-drop="{
        group: 'drink',
        dragStart: alertDragStart
    }"
>
    ${ drink.name }
</li>
```

You may include multiple drag and drop event handlers!

Example 2

```html
<li
    v-for="(drink, drink_index) in drinks"
    :data-index="drink_index"
    v-drag-drop="{
        group: 'drink',
        dragStart: alertDragStart,
        dragOver: dragOverMethod,
        drop: moveElement
    }"
>
    ${ drink.name }
</li>
```

Each of event handlers has default css when initiated. 

* dragStart
    - drag-start
* drag
    - drag
* dragEnter
    - drag-enter
* dragOver
    - drag-over
* dragLeave
    - [NO_DEFAULT_CSS]
* drop
    - [NO_DEFAULT_CSS]
* dragEnd
    - [NO_DEFAULT_CSS]

To override the css of each event handlers, simply put css object in them. 

Example:

```html
<li
    v-for="(drink, drink_index) in drinks"
    :data-index="drink_index"
    v-drag-drop="{
        group: 'drink',
        dragStart: {
            css: 'custom-drag-start'
        },
        drop: {
            css: 'drop'
        },
        dragEnd: {
            css: 'another-custom-drag-end-css'
        }
    }"
>
    ${ drink.name }
</li>
```

To include method in event handlers object, just call method parameter.

Example:

```html
<li
    v-for="(drink, drink_index) in drinks"
    :data-index="drink_index"
    v-drag-drop="{
        group: 'drink',
        dragStart: {
            css: 'custom-drag-start',
            method: actionDrinkDragStart
        },
        drop: {
            css: 'drop',
            method: moveDrinkElement
        },
    }"
>
    ${ drink.name }
</li>
```

## Acknowledgement

This plug-in was inspired by `vue-dnd` and mostly on `vue-drag-and-drop`

This was created due to Vue.js 2 was released and there are no compability for this plug-in. My boss will fry me if I don't make progress at my project.)Therefore, I created this based on these two drag and drop plugin.