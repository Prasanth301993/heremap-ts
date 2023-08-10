import React, { useState, useEffect } from "react";
import H from "@here/maps-api-for-javascript";
import { createRoot } from "react-dom/client";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {    
    let platform = new H.service.Platform({
      apikey: "{YOUR_API_KEY}",
    });

    let maptypes: any = platform.createDefaultLayers();
    let mapElement: any = document.getElementById("mapContainer");
    let map = new H.Map(mapElement, maptypes.vector.normal.map, {
      zoom: 10,
      center: { lng: 13.4, lat: 52.51 },
    });

    new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    return () => {
      console.log("Component will unmount");
    };
  }, []); // The empty dependency array means this effect runs only once after initial render

  return (
    <div>
      <h1>Map</h1>
      
      <div id="mapContainer" style={{width:"100%",height:"500px"}}></div>
    </div>
  );
};

const domNode: any = document.getElementById("root");
const root = createRoot(domNode);
root.render(<App />);
