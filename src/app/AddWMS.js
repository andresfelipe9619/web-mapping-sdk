const AddWMSLayer = (props) => {
  const children = [];
  const layers = props
    .layers
    .slice();
  layers.sort((a, b) => {
    const upperA = a
      .Title
      .toUpperCase();
    const upperB = b
      .Title
      .toUpperCase();
    return (upperA > upperB) - (upperA < upperB);
  });
  for (let i = 0, ii = layers.length; i < ii; ++i) {
    const layer = layers[i];
    const button = (
      <button onClick={() => {
        props.onAddLayer(layer);
      }}>Add</button>
    );
    children.push(
      <li key={i}>{layer.Title}{button}</li>
    );
  }
  return (
    <ul>{children}</ul>
  );
};

const AddWMS = () => {
  // this requires CORS headers on the geoserver instance.
  const url = 'https://demo.boundlessgeo.com/geoserver/wms?service=WMS&request=GetCapabilities';
  fetch(url).then(
    response => response.text(),
    error => console.error('An error occured.', error),
  )
    .then((xml) => {
      const info = new WMSCapabilitiesFormat().read(xml);
      const root = info.Capability.Layer;
      ReactDOM.render(<AddWMSLayer
        onAddLayer={(layer) => {
        // add a new source and layer
          const getMapUrl = `https://demo.boundlessgeo.com/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&SRS=EPSG:900913&LAYERS=${layer.Name}&STYLES=&WIDTH=256&HEIGHT=256&BBOX={bbox-epsg-3857}`;
          store.dispatch(mapActions.addSource(layer.Name, {
            type: 'raster',
            tileSize: 256,
            tiles: [getMapUrl],
          }));
          store.dispatch(mapActions.addLayer({
            type: 'raster',
            metadata: {
              'bnd:title': layer.Title,
              'bnd:queryable': layer.queryable,
            },
            id: layer.Name,
            source: layer.Name,
          }));
        }
        }
        layers={root.Layer}
      />, document.getElementById('add-wms'));
    }).catch((exception) => {
      console.error('An error occurred.', exception);
    });
};

export default AddWMS;