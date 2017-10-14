export default (req) => {
  const {displayName, id} = req.url.query

  return (
    <div>
      <h1>{displayName}</h1>
      <img src={`http://graph.facebook.com/${id}/picture?width=400`} />
    </div>
  )
}
