export default (req) => {
  const {displayName, facebookId} = req.url.query

  return (
    <div>
      <h1>{displayName}</h1>
      <img src={`http://graph.facebook.com/${facebookId}/picture?width=400`} />
    </div>
  )
}
