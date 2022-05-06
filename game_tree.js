class Node{
    constructor(self, data, left = None, right = None){
      this.val = data
      this.left = left
      this.right = right
      this.height = 0
    }
}

models = ["Kicks", "Rogue Sport", "Rogue", "Murano", "Pathfinder", "Armada", "Ariya"]
function car_data_avl(root, currentHeight, height){
    node = root 
    insert_nodes(node)
}

function balance(root){
    node = root
    if node.left > node.right:
        node.left, node.right = node.right, node.left
}

function insert_nodes(root, nodes){
    for (i=0;i<=nodes;i++){
        node = node.left
        if (node.val < node.left.val){
            node.left = i
        }
        else if (node.val > node.left.val){
            node.right = i
        }
    }
    if (node == null){
        node.height = 0;
    }
    node.height = 1 + this.max(this.height(node.left),this.height(node.right));

}