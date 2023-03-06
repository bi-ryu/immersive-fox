import * as React from 'react';
import Draggable from "react-draggable";
import { Rnd } from "react-rnd";
import { useContext, useState, useRef, useEffect } from "react";
import EditorContext from "../../../EditorContext";
import './styles.css'

const DragableComponent = (props) => {
  const { avatarImage, background, aspectRatio } = props;
  const { yPosition, avatarShape, avatarSize, avatarOffsetY, requestConfigs, avatarPositionTab, avatarWidth, avatarHeight, setAvatarPositionTab, setAvatarWidth, setAvatarHeight, setXPosition, setYPosition, setAvatarSize, setAvatarOffsetX, setAvatarOffsetY } = useContext(EditorContext);
  const [boundsWidth, setBoundsWidth] = useState(0);
  const [boundsHeight, setBoundsHeight] = useState(0);
  const [avatarPosition, setAvatarPosition] = useState({
    x: -1,
    y: -1
  })
  const [resizable, setResizable] = useState(false);

  const boundsRef = useRef(null);
  const avatarBoundsRef = useRef(null);
  const resizedAvatarHeight = boundsHeight * avatarSize / 100;
  const resizedAvatarWidth = avatarShape === "circle" ? resizedAvatarHeight : resizedAvatarHeight * aspectRatio;

  useEffect(() => {
    setBoundsWidth(boundsRef.current.clientWidth);
    setBoundsHeight(boundsRef.current.clientHeight);
  }, [])
  useEffect(() => {
    setAvatarHeight(resizedAvatarHeight);
    setAvatarWidth(resizedAvatarWidth);

    if (avatarPositionTab === "left") {
      setAvatarOffsetX(0);
      setXPosition(0)
      if (avatarOffsetY === 0) {
        setAvatarPosition({
          x: 0,
          y: (boundsHeight - resizedAvatarHeight) / 2
        })
        setAvatarOffsetY((boundsHeight - resizedAvatarHeight) / 2)
        setYPosition(((boundsHeight / 2 - resizedAvatarHeight / 2) / boundsHeight).toFixed(6))
      } else {
        // setAvatarPosition({
        //   x: 0,
        //   y: avatarOffsetY
        // })
      }
    } 
    else if (avatarPositionTab === "center") {
      setAvatarOffsetX((boundsWidth - resizedAvatarWidth) / 2);
      setXPosition(((boundsWidth - resizedAvatarWidth) / boundsWidth / 2).toFixed(6))
      if(avatarOffsetY === 0) {
        setAvatarPosition({
          x: (boundsWidth - resizedAvatarWidth) / 2,
          y: (boundsHeight - resizedAvatarHeight) / 2
        })
        setAvatarOffsetY((boundsHeight - resizedAvatarHeight) / 2);
        setYPosition(((boundsHeight - resizedAvatarHeight) / boundsHeight / 2).toFixed(6))
      } else {
        // setAvatarPosition({
        //   x: (boundsWidth - resizedAvatarWidth) / 2,
        //   y: avatarOffsetY
        // })
      }
    } 
    else if (avatarPositionTab === 'right') {
      setAvatarOffsetX((boundsWidth - resizedAvatarWidth));
      setXPosition(((boundsWidth - resizedAvatarWidth) / boundsWidth).toFixed(6))
      if (avatarOffsetY === 0){
        setAvatarPosition({
          x: boundsWidth - resizedAvatarWidth,
          y: (boundsHeight - resizedAvatarHeight) / 2
        })
        setAvatarOffsetY((boundsHeight - resizedAvatarHeight) / 2)
        setYPosition(((boundsHeight - resizedAvatarHeight) / boundsHeight / 2).toFixed(6))
      } else {
        // setAvatarPosition({
        //   x: boundsWidth - resizedAvatarWidth,
        //   y: avatarOffsetY
        // })
      }
    }
    if (avatarShape === "circle") {
      setAvatarWidth(avatarHeight);
    } else {
      setAvatarWidth(avatarHeight * aspectRatio)
    }
  }, [boundsWidth, boundsHeight, avatarSize, avatarShape, avatarOffsetY, aspectRatio, avatarPositionTab, avatarWidth, avatarHeight, yPosition, avatarPosition, setXPosition, setYPosition, setAvatarWidth, setAvatarHeight, setAvatarOffsetX, setAvatarOffsetY, resizedAvatarHeight, resizedAvatarWidth]);
  
  useEffect(() => {
    if (avatarPositionTab === "left") {
      setAvatarPosition({
        x: 0,
        y: avatarOffsetY
      })
    } else if (avatarPositionTab === "center") {
      setAvatarPosition({
        x: (boundsWidth - resizedAvatarWidth) / 2,
        y: avatarOffsetY
      })
    } else if (avatarPositionTab === "right"){
      setAvatarPosition({
        x: boundsWidth - resizedAvatarWidth,
        y: avatarOffsetY
      })
    }
  }, [avatarOffsetY, avatarPositionTab, boundsWidth, resizedAvatarWidth])

  return (
    <div className="draggable" ref={boundsRef} style={{ aspectRatio: '16/9', ...background }} onMouseDown={(e) => { setResizable(!resizable) }}>
      <Draggable
        bounds="parent"
        defaultClassName='draggable-wrap'
        onMouseDown={(e) => { e.preventDefault(); setAvatarPositionTab("moved"); }}
        position={avatarPosition}
        onDrag={(event, data) => {
          setAvatarPosition({
            x: data.x,
            y: data.y
          })
          // setAvatarOffsetX(data.x)
          // setAvatarOffsetY(data.y)
          setAvatarPositionTab("moved");
        }}
        onStop={(event, data) => {
          setAvatarPosition({ x: data.x, y: data.y });
          setAvatarOffsetX(data.x);
          setAvatarOffsetY(data.y);
          setXPosition((data.x / boundsWidth).toFixed(6))
          setYPosition((data.y / boundsHeight).toFixed(6))
          setAvatarPositionTab("moved")
        }}
      >
        <Rnd
          className='avatar-outter-bounds'
          ref={avatarBoundsRef}
          disableDragging={false}
          enableUserSelectHack={true}
          lockAspectRatio={true}
          enableResizing={resizable}
          style={{ border: resizable ? "solid 3px #FE6338" : "" }}
          position={avatarPosition}
          onMouseDown={(e) => { setResizable(true); setAvatarPositionTab("moved"); }}
          size={{
            width: avatarWidth,
            height: avatarHeight
          }}
          onResize={(e, direction, ref, delta, position) => {
            // setAvatarSize((parseInt(ref.style.height.slice(0, -2)) / boundsHeight * 100).toFixed(0))
            // setAvatarHeight(ref.style.height);
            // setAvatarWidth(ref.style.width);
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            if (avatarShape === 'circle') {
              setAvatarWidth(ref.style.height);
            } else {
              setAvatarWidth(ref.style.height * aspectRatio);
            }
            setAvatarHeight(ref.style.height);
            setAvatarSize((parseInt(ref.style.height.slice(0, -2)) / boundsHeight * 100).toFixed(0))
            setAvatarPosition({ x: position.x, y: position.y });
            setAvatarPositionTab("moved");
          }}
        >
          <div className='avatar-inner-bounds'
            style={{
              background: avatarShape === "circle" ? requestConfigs.circleBackground : '',
              borderRadius: avatarShape === "circle" ? '50%' : 0
            }}>
            {resizable && (
              <>
                <div className='resizable-point' style={{ top: -7, left: -7 }}></div>
                <div className='resizable-point' style={{ top: -7, right: -7 }}></div>
                <div className='resizable-point' style={{ bottom: -7, left: -7 }}></div>
                <div className='resizable-point' style={{ bottom: -7, right: -7 }}></div>
              </>
            )}
            <img src={avatarImage} alt="avatarImage" />
          </div>
        </Rnd>
      </Draggable>
    </div>
  )
};

export default DragableComponent;