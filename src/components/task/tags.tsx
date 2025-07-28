const Tags = ({ name, color, tcolor='#FFFFFF', dotcolor="#FFFFFF" }: { name: string; color: string; tcolor?: string; dotcolor?: string }) => {
  return (
    <div style={{ backgroundColor: color, color: tcolor }}
      className="px-2 h-fit rounded-full w-fit flex items-center gap-2">
        <div className="rounded-full w-2 h-2"
        style={{backgroundColor: dotcolor}}></div>
      <h5>{name}</h5>
    </div>
  )
}
 export default Tags