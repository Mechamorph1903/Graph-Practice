import uuid
from typing import TypeVar, Generic, List

# We define 'T' as a generic type variable so this class can hold strings, ints, or custom objects  
T = TypeVar('T')

class Vertex(Generic[T]):
    def __init__(self, name: T):
        self.tvalue = name # Holds your data (e.g., "Main St Station")
        self.neighbours:List = [] # List that will hold Edge objects connecting to neighbors
        self.uuid = uuid.uuid4() # Generates a completely unique ID for this vertex

    def __eq__(self, other) -> bool:
        """It allows you to use `vertex_a == vertex_b` in Python."""

        if not isinstance(other, Vertex):
            return False
        return self.uuid == other.uuid
    
    def __repr__(self) -> str:
        """Helper string representation for easier debugging in your terminal"""
        return f'Vertex({self.tvalue})'
    

stop_a = Vertex("Downtown")
stop_b = Vertex("Campus")

print(stop_a)
print(stop_a == stop_b)

# defining edges
class Edge(Generic[T]):
    def __init__(self, neighbour: 'Vertex[T]', weight: int = 0):
        self.neighbour = neighbour  # The destination Vertex object
        self.weight = weight      # Travel time/distance integer (defaults to 0)

    def __repr__(self) -> str:
        """Terminal helper to see where this edge goes"""
        return f"➡️ (Leads to: {self.neighbour.tvalue}, Weight: {self.weight})"
    
# 1. Create the Vertices
stop_c = Vertex("Airport")
stop_d = Vertex("Mall")

# 2. Create an Edge that points directly to the destination (Stop B)
road_to_campus = Edge(neighbour=stop_d, weight=5)

# 3. Shove that edge inside Stop A's neighbors list
stop_c.neighbours.append(road_to_campus)

from typing import TypeVar, Generic, List

T = TypeVar('T')

class Graph(Generic[T]):
    def __init__(self):
        # The master canvas list holding every single Vertex in our system
        self.canvas: List[Vertex[T]] = []
        
    def add_vertex(self, element: Vertex[T]):
        """Adds a pre-existing Vertex object to our master map list"""
        self.canvas.append(element)
        
    def add_edge(self, source: Vertex[T], neighbor: Vertex[T], weight: int):
        """
        Creates a one-way street (Edge) starting at 'source' 
        and pointing directly to 'neighbor' with a travel cost.
        """
        # 1. Instantiate the Edge object using our Edge blueprint
        new_edge = Edge(neighbor=neighbor, weight=weight)
        
        # 2. Shove this new edge into the source vertex's neighbors list
        source.neighbors.append(new_edge)


# 1. Setup the Master Controller
transit_map = Graph()

# 2. Add them to the master canvas database
transit_map.add_vertex(stop_a) 
transit_map.add_vertex(stop_b) 

# 3. Use the new helper function to link them!
transit_map.add_edge(source=stop_a, neighbor=stop_b, weight=7) # Downtown -> Campus (Takes 7 mins)
transit_map.add_edge(source=stop_b, neighbor=stop_c, weight=12)# Campus -> Airport (Takes 12 mins)
transit_map.add_edge(source=stop_c, neighbor=stop_a, weight=15)# Airport -> Downtown (Takes 15 mins)