interface IShape {
  id: string;
  type: string;
  text: string;
}


let shapes: Array<IShape> = [
{
  id: "1",
  type: "rect",
  text: "Idea 2 Visuals",
},
{
  id: "2",
  type: "circle",
  text: "Draw",
},
{
  id: "3",
  type: "circle",
  text: "elaborate",
},
{
  id: "4",
  type: "circle",
  text: "experiment",
},
]

const getShapes = ({ response }: { response: any }) => { 
  response.body = shapes 
}

const findById = (id: string): ( IShape | undefined ) =>{
  return shapes.filter(shape => shape.id === id )[0]
}


const getShape = ({ params, response }: { params: { id: string }; response: any }) => {
  const shape: IShape | undefined = findById(params.id)
  if (shape) {
    response.status = 200
    response.body = shape
  } else {
    response.status = 404
    response.body = { message: `Shape not found.` }
  }   
}

const addShape = async ({request, response}: {request: any; response: any}) => {
  const body  = await request.body()
  const shape: IShape = body.value
  shapes.push(shape)
  response.body = {
    message: "OK"
  }
  response.status = 200
}

const updateShape =  async ({ params, request, response }: { params: { id: string }; request: any; response: any }) => {
  let shape: IShape | undefined = findById(params.id)
  if (shape) {
    const body = await request.body()
    const updates: { type?: string; text?: string } = body.value
    shape = {...shape, ...updates} // update 

    // Update the shape back to array
    shapes = [...shapes.filter(s => s.id !== params.id), shape]

    response.status = 200
    response.body = {
      message: "OK"
    } 
  } else {
    response.status = 404;
    response.body = {
      message: "Shape not found"
    }
  }
}

const deleteShape = ({ params, response }: { params: { id: string }; response: any }) => {
  shapes = shapes.filter(shape => shape.id !== params.id)
  response.body = { message: 'OK' }
  response.status = 200
}

export  {
  getShapes, 
  getShape, 
  addShape, 
  updateShape, 
  deleteShape 
}