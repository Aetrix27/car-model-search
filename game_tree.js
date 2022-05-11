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
            for (let string=0; string< strings.length; string++){
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

    string_repr(){
        throw 'PrefixTree({this.strings()!r})'
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
            this._traverse(node[1], prefix, completions)
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
            var child = node.get_child(nodes[char])
            this._traverse(child, prefix + nodes[char], strings)
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

    //return tree

}

function matchedPrefixes(e) {
    if (e.target.value.length >= 3){
        //tree = create_prefix_tree(e.target.value)
        //completions = tree.complete(prefixes[prefix])
        //console.log('complete' + completions)
        completions = tree.complete(e.target.value)
        var outputStr = ''
        for (let i = 0;i<completions.length;i++){
            //outputStr += completions[i]
            var elemLink = document.createElement('a');
            elemLink.innerText = completions[i]
            elemLink.onclick = function() { 
                carsList.push(elemLink.innerText) 
                all.innerHTML = carsList

            };

            //elemLink.setAttribute('href',"yourlink.htm");

            log.appendChild(elemLink)
        }
  
        console.log(completions)
        
    }   
}


function create_prefix_tree(prefix){
    //Show each string in trie as a list

    tree = new PrefixTree()
    console.log('\ntree: ' + tree)
    console.log('root:' + tree.root)
    console.log('strings:' + tree.strings())

    console.log('\nInserting strings:')
    //for (let string = 0; string < strings.length; string++){
    //tree.insert(strings[string])
    //tree.insert(prefix)
    //console.log('insert'+tree.size)
    //}

    console.log('\ntree: '+ tree)
    console.log('root:' + tree.root)

    console.log('\nSearching for strings in tree:')
    //sorted_str = strings.sort()
    //for (let string = 0; string < sorted_str.length; string++){

    //result = tree.contains(sorted_str[string])
    //Check if its in string
    result = tree.contains(prefix)
    console.log('contains' + result)
    //}

    //console.log('\nSearching for strings not in tree:')
    //arr= []
    //for (let string=0;string<strings.length; string++){
    //    arr.push(strings[string].slice(0,Math.floor(string.length/2)))
    //}
    //prefixes = arr.sort()
    //for (let prefix=0; prefix<prefixes.length;prefix++){
    //    if (prefixes[prefix].length == 0 || strings.includes(prefixes[prefix])){
    //        continue
    //    }
    //    result = tree.contains(prefixes[prefix])
    //    console.log('contains' + result)
    //}
    //prefixes=['AB']

    //Get all matching strings
    console.log('\nCompleting prefixes in tree:')
    //for (let prefix=0; prefix<prefixes.length;prefix++){
    completions = tree.complete(prefix)
    console.log('complete' + completions)
    //}

    console.log('\nRetrieving all strings:')
    retrieved_strings = tree.strings()
    console.log('retrieved strings: ' + retrieved_strings)
    matches = retrieved_strings == strings
    console.log('matches?' + matches)

    return tree
}
//var strings = ['ABC', 'ABD', 'A', 'XYZ']
//create_prefix_tree(strings)