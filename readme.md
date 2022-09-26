# Hi all!
From this moment, the development of my framework begins.

This is not a replacement for vue or react. This is some training of my abilities in JS. I will be glad if you implement something in this framework)

And now a little about what he can do at the moment

### file system
All necessary code is written in the src folder

A little about the structure:

`index.js` is the main file, the main component is given into it. The function for rendering is also called there.

The `app` file contains a function. This is how the components are defined.

each component is an object

```
{
    tag: "html" ("div" or others) or component
    props: {},
    child: []
}
```

Please observe the naming in the component, otherwise nothing will work)

`example`
```
{
    tag: "div",
    props: {
        class: "comp"
    },
    child: [
        "i'm component"
    ]
}
```

## props
The prop itself is an object.

Everything that you write in props will be written in htm-tag

except for one moment, about it later

if you write @ in front of the key name in the prop, you will add a listener to the html-tag

`example`
```
props: {
    id: "id",
    class: "class",
    @click: function () {},
    key: () => { return "" or 123},
    style: "padding-left: 10px" OR { paddingLeft: "10px" }
}
```

### child 

child is an array. You can put the children of the component in it.

`filling examples`
```
child: [
    nameComponent,
    () => {},
    {
        tag: "div",
        child: ["some text"]
    },
    {
        tag: nameComponent,
        props: {
            ...    
        }
    },
    "string",
    123
]
```

! note !
if you want to write the name of the component in the tag, then you can't use the child array in the object

### component
```
const component = () => {
    return  {
        tag: "div",
        child: [...]
    }
}
```

If the parent had props, you can use them inside the component

`example`
```
*component*
const comp = (props) => {
    return {
        tag: "div",
        child: [props.name]
    }
}

const app = () => {
    return {
        tag:"div",
        props: {
            name: "name"
        },
        child: [
            comp
        ]
    }
}
```
In such cases, you can use all the props from the parent. If you need to pass some specific props without touching the parent ones, do this

```
*component*
const comp = (props) => {
    return {
        tag: "div",
        child: [props.name]
    }
}

const app = () => {
    return {
        tag:"div",
        props: {
            name: "name"
        },
        child: [
            {
                tag: comp,
                props: {
                    name: "other name"
                }
            }
        ]
    }
}
```

In this case, another name will be sent to comp

You can also call the component function directly

```
*component*
const comp = (props) => {
    return {
        tag: "div",
        child: [props.name]
    }
}

const app = () => {
    return {
        tag:"div",
        props: {
            name: "name"
        },
        child: [
            comp({name: "name"})
        ]
    }
}
```
In such cases, the component will be rendered as it should.

### work with array
`example`

```
const comp = (props) => {
    return {
        tag: "p",
        child: [
            "here : " + props.name
        ]
    }
}

const app = () => {
    const name = ["name1", "name2", "name3"];
    return {
        tag: "div",
        child: [
            name.map((item) => {
                return {
                    tag: comp,
                    props: {
                        name: item
                    }   
                }
            })
        ]
    }
}
```


### Specific tags

You can prescribe tags like `<br >` `<hr />` immediately, bypassing the usual notation, the builder will reconvert your theme into a understandable for the builder

`example`
```
child: [
    "<br/>" => convert to { tag:"br" }
]
```

also, you can embed svg directly into child
```
child: [
 `<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>`
]
```

this also works for all html tags

### work with ,img
```
{
    tag: "img",
    props: {
        "src": require("path")
    }
}
```
supported types 
`ico png jpg jpeg svg gif`

### ref

You can create a reactive object with type (number, string, booalen)

You need to connect a function for this

```
import { ref } from "../../core";
```

init
```
const obj = ref(1);
```

For modification, you need to refer to the value field

```
val.value = some value
```

`example`
```
{
    tag: "div",
    props: {
        "@click": () => {
            obj.value += 1;
        },
        id: obj,
    },
    child: [
        obj,
    ]
}
```

### watch
You can watch the ref change

```
watch(callback, ref);
```

`example`
```
const app = () => {
    const o = ref(1)
    watch((new, old) => {...}, o)
}
```

### Operating modes
You can start your local server with the command
```
npm run dev
```
the server starts on port 8080 or higher if the port is busy

You can also build your project with the command
```
npm run build
```


