// Box2d Utility Functions

function b2dCreateWorld()
{
  var worldAABB = new b2AABB();
  worldAABB.minVertex.Set(-2000, -2000);
  worldAABB.maxVertex.Set(2000, 2000);
  var gravity = new b2Vec2(0, 0);
  var doSleep = false;
  var world = new b2World(worldAABB, gravity, doSleep);
  return world;
}

function b2dCreateBox(x, y, w, h, world, static)
{
  static = static === true; // Handle non-bool values

  var bodyDef = new b2BodyDef();
  bodyDef.position.Set(x, y);
  bodyDef.preventRotation = static;
  
  var shapeDef = new b2BoxDef();
  shapeDef.extents.Set(w, h);
  shapeDef.density = static ? 0.0 : 1.0;
  shapeDef.restitution = 1.0;

  bodyDef.AddShape(shapeDef);
  var body = world.CreateBody(bodyDef);
  return body;
}

function b2dCreateCircle(x, y, r, world, static)
{
  static = static === true; // Handle non-bool values

  var bodyDef = new b2BodyDef();
  bodyDef.position.Set(x, y);
  bodyDef.preventRotation = static;

  var shapeDef = new b2CircleDef();
  shapeDef.density = static ? 0.0 : 1.0;
  shapeDef.radius = r;
  shapeDef.restitution = 1.0;
  shapeDef.friction = 0.5; // Not necessary??

  bodyDef.AddShape(shapeDef);
  var body = world.CreateBody(bodyDef);
  return body; // Can be done in fewer lines
}
