let PrefixTreeNode = class{

    constructor(strings, character=null){
        strings = null
        this.character = character
        this.children = {}
        this.terminal = false
    }
    is_terminal(){
        character = null
        if (this.terminal != null){
            return true
        }else{
            return false
        }
    }
    num_children(){
        var count = 0
        for (i=0;i<this.children;i++){
            count += 1
        }
        return count
    }
   has_child(character){
        if (this.children.includes(character)){
            return true
        }else{
            return false
        }
    }
    get_child(character){
        if (this.has_child(character)){
            return this.children[character]
        }else{
            throw 'No child exists for character {character!r}'
        }
    }

    add_child(character, child_node){
        if (this.has_child(character) == false){
            this.children[character] = child_node
            
        }else{
            throw 'No child exists for character {character!r}'
        }
    }
}

var test = new PrefixTreeNode()


let PrefixTree = class{

    START_CHARACTER = ''

    constructor(strings=null){
        this.root = new PrefixTreeNode(PrefixTree.START_CHARACTER)
        this.size = 0
        if(strings != null){
            for (string=0;string++;string<=strings.length){
                this.insert(strings[string])
            }
        }
    }

    //this.models = ["Kicks", "Rogue Sport", "Rogue", "Murano", "Pathfinder", "Armada", "Ariya", "GTR"]

    insert(string){
        //Insert the given string into this prefix tree.
        //start traversing down the trie
        node = this.root
        for (character in string){
            first_node = this.root.children[first_char]
            if (node.has_child(character)){
                node = node.get_child(character)
            }else{
                new_node = PrefixTreeNode(character)
                node.add_child(character, new_node) 
                node = new_node
            }
        }
        if (node.is_terminal() == null){
            this.size += 1
            node.terminal = True
        }

    }
    __init__(strings=None){
        self.root = PrefixTreeNode(PrefixTree.START_CHARACTER)
        self.size = 0
        if (strings != null){
            for (var string = 0; string<strings.length; string++){
                self.insert(strings[string])
            }
        }
    }
    
    __repr__(){
        throw 'PrefixTree({self.strings()!r})'
    }

    is_empty(){
        if (this.size == 0){
            return True
        }else{
            return False
        }
    }

    contains(string){

        node = self.root
        for (char = 0; char<string.len; char++){
            if (node.has_child(string[char])){
                child = node.get_child(string[char])
                node = child 
            }else{
                return node.is_terminal()
            }
        }
        return node.is_terminal() 
    }
        

    insert(string){
        node = self.root
        for (character = 0; character<string.len;character++){
            if (node.has_child(string[character])){
                node = node.get_child(string[character])
            }else{
                new_node = PrefixTreeNode(string[character])
                node.add_child(string[character], new_node) 
                node = new_node
            }
        }
        if (node.is_terminal() == null){
            self.size += 1
            node.terminal = True
        }
    }

    _find_node(string){
        if (string.len == 0){
            return 0, self.root
        }
        node = this.root
        depth = 0
        for (character = 0; character<string.len; character++){
            if (node.has_child(string[character]) == true){
                node = node.get_child(string[character])
                depth += 1
            }else{
                break
            }
        }
            
        return depth, node
    }
            

    complete(prefix){
        var completions = []
        if (prefix == ''){
            return this.strings()
        }
        node = this._find_node(prefix)
        if (node[1].character != ''){
            this._traverse(node[1], prefix, completions.append)
        }
        return completions
    }


    strings(){
        var strings = []
    
        this._traverse(this.root, '', strings.append)
        return strings
    }


    _traverse(node, prefix, visit){
        if (node.is_terminal()){
            visit(prefix)
        }
        //node.children.keys
        for (char =0; char<node.children.keys().length; char++){
            child = node.get_child(char)
            this._traverse(child, prefix + char, visit)
        }
    }


}

tongue_twisters = {
    'Seashells': 'Shelly sells seashells by the sea shore'.split()
}
for (strings = 0; strings < tongue_twisters.values(); strings++){
    console.log('{name} tongue-twister:')
    create_prefix_tree(tongue_twisters.values()[strings])

}

function create_prefix_tree(strings){
        
    console.log('strings: {strings}')

    tree = new PrefixTree()
    console.log('\ntree: ' + tree)
    console.log('root:' + tree.root)
    console.log('strings: {tree.strings()}')

    console.log('\nInserting strings:')
    for (string = 0; string < string.length; string++){
        tree.insert(strings[string])
        console.log('insert({string!r}), size: {tree.size}')
    }

    console.log('\ntree: '+ tree)
    console.log('root:' + tree.root)

    console.log('\nSearching for strings in tree:')
    sorted_str = new Set((strings).sort())
    for (string = 0; string < sorted_str.length; string++){
        result = tree.contains(string)
        console.log('contains({string!r}): {result}')
    }

    console.log('\nSearching for strings not in tree:')
    arr= []
    for (string=0;string<strings.length;string++){
        arr.append(string.slice(0,Math.floor(string.length/2)))
    }

    prefixes = sorted(set(arr))
    for (prefix=0; prefix<prefixes.length;prefix++){
        if (prefixes[prefix].length == 0 || prefixes[prefix] in strings){
            continue
        }
        result = tree.contains(prefixes[prefix])
        console.log('contains({prefix!r}): {result}')
    }

    console.log('\nCompleting prefixes in tree:')
    for (prefix=0; prefix<prefixes.length;prefix++){
        completions = tree.complete(prefix)
        console.log('complete({prefix!r}): {completions}')
    }

    console.log('\nRetrieving all strings:')
    retrieved_strings = tree.strings()
    console.log('strings: {retrieved_strings}')
    matches = set(retrieved_strings) == set(strings)
    console.log('matches? {matches}')
}