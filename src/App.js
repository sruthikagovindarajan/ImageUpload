import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Tree from './components/Tree';
import ImageUploading from 'react-images-uploading';

function App() {
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList) => {
    setImages(imageList);
    localStorage.setItem('images', JSON.stringify(imageList));
  };

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('images')) || [];
    setImages(storedImages);
  }, []);

  return (
    <div className="App" style={{ display: 'flex' }}>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper" style={{ width: '1300px' }}>
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={() => {
              onImageRemoveAll();
              setImages([]);
              localStorage.removeItem('images');
            }}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => {
                    onImageRemove(index);
                    const updatedImages = imageList.filter((_, i) => i !== index);
                    setImages(updatedImages);
                    localStorage.setItem('images', JSON.stringify(updatedImages));
                  }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      <Tree imageCount={images.length} />
    </div>
  );
}

export default App;
