# Pokémon Team Checker
> **DISCLAIMER**: Pokémon and Pokémon character names are trademarks of Nintendo.

This is a simple app to check the strength of your team. I originally made this to help analyze whether my team was good enough to tackle the Elite Four and Champion of various regions. This is less useful for the competitive scene and is not meant to be used there.

## Features

1. **PokéAPI data**. This tool uses PokéAPI to get its data. This is the most comprehensive Pokémon API and as such, contains every Pokémon imaginable - including mega evolutions and Dynamax forms.
2. **Team Coverage**. This tool allows you to see whether at least one of your team members can launch a super effective move against a certain type. It doesn't take into account whether the Pokémon is weak to such type. For example, Garchomp with Iron Tail will cover Fairy even if it is weak to Fairy moves.
3. **Team Weaknesses**. This tool will collate all weaknesses in your team. It simultaneously shows you which Pokémon types you should not worry about and which ones you should watch out for.
4. **Team Stats**. This tool allows you to see the average stats among your team. This also makes use of an "effective attack" rather than an average attack/special-attack stat. The reasoning is that if a Pokémon has only special attacks in its moveset, it effectively has an attack stat of 0. Thus, this tool accounts for that.
5. **Navigable by keyboard**. I made sure that you don't need a mouse to navigate the website. You can use a keyboard to navigate the site if that is your taste.

## License

```text
Copyright 2021 David Lozano

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
