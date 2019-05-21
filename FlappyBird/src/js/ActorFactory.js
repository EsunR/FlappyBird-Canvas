import Pipe from "./Pipe";
import Bird from "./Bird";
import Land from "./Land";
import Background from "./Background";

class ActorFactory {
  constructor() {
    
  }
  getActor(actor) {
    switch (actor)  {
      case 'Bird':
        return new Bird;
      case 'Pipe':
        return new Pipe;
      case 'Land':
        return new Land;
      case 'Background':
        return new Background;
    }
  }
}

export default ActorFactory;