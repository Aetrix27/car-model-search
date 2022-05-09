let PrefixTreeNode = class{
    constructor(strings){
        strings = null
        this.character = character
        this.children = PrefixTreeNode.CHILDREN_TYPE()
        this.terminal = False
    }
    is_terminal(){
        character = null
        if (self.terminal != null){
            return true
        }else{
            return false
        }
    }
    num_children(){
        var count = 0
        for (i=0;i<self.children;i++){
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

var test = PrefixTreeNode()


let PrefixTree = class{

    START_CHARACTER = ''

    constructor(strings=None){
        this.root = PrefixTreeNode(PrefixTree.START_CHARACTER)
        this.size = 0
        if(strings != null){
            for (string=0;string++;string<=strings.length()):
            this.insert(string)
        }
    }

    //this.models = ["Kicks", "Rogue Sport", "Rogue", "Murano", "Pathfinder", "Armada", "Ariya", "GTR"]

    insert(this, string){
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


}