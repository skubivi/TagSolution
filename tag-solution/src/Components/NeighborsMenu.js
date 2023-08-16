import FieldInMenu from "./FieldInMenu"
import '../scss/neighborsMenu.scss'

const NeighborsMenu = (props) => {
    const childrens = []
    let parent
    for (let i = 0; i < props.neighbors.length; i++) {
        if (props.neighbors[i].isParent === true) parent = <FieldInMenu field={props.neighbors[i]}/>
        else childrens.push(<FieldInMenu key={i} field={props.neighbors[i]}/>)
    }
    return (
        <div className="NeighborsMenu">
            {parent !== undefined && <p>Родительский Элемент</p>}
            {parent}
            {childrens.length > 0 && <p>Элементы потомки</p>}
            {childrens}
        </div>
    )
}

export default NeighborsMenu