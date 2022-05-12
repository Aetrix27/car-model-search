//import * from './home.html';

let PrefixTreeNode = class{

    constructor(character=null){
        this.character = character
        this.children = {}
        this.terminal = false
    }
    is_terminal(){
        if (this.terminal == true){
            return true
        }else{
            return false
        }
    }
    num_children(){
        var count = 0
        for (let i=0; i<this.children; i++){
            count += 1
        }
        return count
    }
   has_child(character){
        if (character in this.children){
            return true
        }else{
            return false
        }
    }
    get_child(character){
        if (this.has_child(character)){
            return this.children[character]
        }else{
            return 'No child exists for character {character!r}'
        }
    }

    add_child(character, child_node){
        if (this.has_child(character) == false){
            this.children[character] = child_node
            
        }else{
            return 'No child exists for character {character!r}'
        }
    }
}


let PrefixTree = class{

    constructor(strings=null){
        this.root = new PrefixTreeNode('')
        this.size = 0
        if(strings != null){
            for (let string=0; string < strings.length; string++){
                this.insert(strings[string])
            }
        }
    }

    //this.models = ["Kicks", "Rogue Sport", "Rogue", "Murano", "Pathfinder", "Armada", "Ariya", "GTR"]

    insert(string){
        //Insert the given string into this prefix tree.
        //start traversing down the trie
        var node = this.root
        for (let character=0;character < string.length; character++){
            if (node.has_child(string[character])){
                node = node.get_child(string[character])
            }else{
                var new_node = new PrefixTreeNode(string[character])
                node.add_child(string[character], new_node) 
                node = new_node
            }
        }
        if (node.is_terminal() == false){
            this.size += 1
            node.terminal = true
        }
      

    }

    is_empty(){
        if (this.size == 0){
            return true
        }else{
            return false
        }
    }

    contains(string){
        var node = this.root
        for (let char = 0; char < string.length; char++){
            if (node.has_child(string[char])){
                var child = node.get_child(string[char])
                node = child 
            }else{
                return node.is_terminal()
            }
        }
        return node.is_terminal() 
    }
        
    _find_node(string){
        if (string.length == 0){
            return 0, this.root
        }
        var node = this.root
        var depth = 0
        for (let character = 0; character<string.length; character++){
            if (node.has_child(string[character]) == true){
                node = node.get_child(string[character])
                depth += 1
            }else{
                break
            }
        }
            
        return [depth, node]
    }
            

    complete(prefix){
        var completions = []
        if (prefix == ''){
            return this.strings()
        }
        var node = this._find_node(prefix)
        if (node[1].character != ''){
            this.trav(node[1], prefix, completions, node[0])
        }
        return completions
    }


    strings(){
        var strings = []
        this._traverse(this.root, '', strings)
        return strings
    }

    _traverse(node, prefix, strings){
        if (node.is_terminal() == true){
            console.log(prefix)
            strings.push(prefix)
        }
        //node.children.keys
        var nodes = Object.keys(node.children);
        for (let char = 0; char < nodes.length; char++){
            console.log(nodes[char])
            var child = node.get_child(nodes[char])
            this._traverse(child, prefix + nodes[char], strings)
        }
    }

    trav(node, prefix, strings, depth){
        if (node.is_terminal() == true && prefix.length == depth){
            console.log(prefix)
            strings.push(prefix)
        }
        //node.children.keys
        var nodes = Object.keys(node.children);
        for (let char = 0; char < nodes.length; char++){
            console.log(nodes[char])
            var child = node.get_child(nodes[char])
            this.trav(child, prefix + nodes[char], strings, depth)
        }
    }

   

}
var tree = new PrefixTree()

const input = document.querySelector('input');
const log = document.getElementById('cars');
const all = document.getElementById('allCars');
var carsList = []
input.addEventListener('input', matchedPrefixes);
    
function addToTrie(tree){
    car = document.getElementById("car_input").value
    console.log(car)
    tree.insert(car)
    carsList.push(car)

    //return tree

}

function matchedPrefixes(e) {
    if (e.target.value.length >= 3){
        //log.innerHTML = '';

        //tree = create_prefix_tree(e.target.value)
        //completions = tree.complete(prefixes[prefix])
        //console.log('complete' + completions)
        completions = tree.complete(e.target.value)
        console.log(completions)

        var outputStr = ''
        var links = []
        for (let i = 0;i<completions.length;i++){
            //outputStr += completions[i]
            var elemLink = document.createElement('a');
            //displays auto complete
            elemLink.innerText = completions[i]
            elemLink.onclick = function() { 
                carsList.push(elemLink.innerText) 
                all.innerHTML = carsList

            };
            log.appendChild(elemLink)


            //elemLink.setAttribute('href',"yourlink.htm");
            //if (links.includes(elemLink.innerText) == false){
                //links.push(elemLink.innerText)

            //}
        }

    }else{
        log.innerHTML = '';
    }
}

