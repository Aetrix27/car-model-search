class Node:
    def __init__(self, data, left = None, right = None):
      self.val = data
      self.left = left
      self.right = right

def rotate(root):
    if not root:
         return
         root=root.right
         if currentHeight < h:
            if currentHeight % 2 == 0:
               if root.left and root.right:
                  root.val = max(root.left.val, root.right.val)
            if root.left < root.right:
                root.val = root.right
            elif root.right < root.left:
                root.val = root.right