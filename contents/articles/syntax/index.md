---
title: Code and stuff!
author: the-wintersmith
date: 2012-10-01 15:00
template: article.html
---

Syntax highlighting with [highlight.js](https://highlightjs.org/).
The theme used is tomorrow, you can find more themes [here](https://highlightjs.org/static/demo/).

---

### JavaScript

```javascript
function getRandomNumber() {
    return 4; // chosen by fair dice roll.
              // guaranteed to be random.
}
```

### CoffeeScript

```coffeescript
class Animal
  ### Intelligent design ###
  getDNA: ->
    print 'sequencing...'
    while true
      sleep 1

class Monkey extends Animal
  speak: ->
    print 'ah ah ah'

class Human extends Monkey
  speak: ->
    print ['yolo' unless i % 3] + ['swag' unless i % 5] or i for i in [1..100]
```

### C

```c
#include <stdio.h>

int main(void)
{
  printf("Hello world\n");
  return 0;
}
```

### C++

```cpp
#include <iostream>

int main()
{
  std::cout << "Hello World!" << std::endl;
  return 0;
}
```

### C-sharp

```cs
class ExampleClass
{
    static void Main()
    {
        System.Console.WriteLine("Hello, world!");
    }
}
```

### CSS

```css
@font-face {
  font-family: Chunkfive; src: url('Chunkfive.otf');
}

body, .usertext {
  color: #F0F0F0; background: #600;
  font-family: Chunkfive, sans;
}

@import url(print.css);
@media print {
  a[href^=http]::after {
    content: attr(href)
  }
}
```

### Erlang

```erlang
io:format("~s~n", ["hello, world"])
```

### Go

```go
package main

import "fmt"

func main() {
   fmt.Println("Hello World!")
}
```

### Java

```java
public class HelloWorld {
   public static void main(String[] args) {
       System.out.println("Hello world!");
   }
}
```

### ObjectiveC

```objectivec
#import <stdio.h>

int main(void)
{
    printf("Hello, World!\n");
    return 0;
}
```

### PHP

```php
<?php echo 'Hello, world'; ?>
```

### Python

```python
import antigravity

print("Hello World")
```

### Ruby

```ruby
puts "Hello world!"
```
