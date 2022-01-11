import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import _ from 'lodash'

import Loader from '../Misc/Loader';
import './index.css';

const customTheme = {
    'common.bi.image': '',
    'common.bisize.width': '251px',
    'common.bisize.height': '21px',
    'common.backgroundImage': 'none',
    'common.backgroundColor': 'white',
    'common.border': '0px',

    // header
    'header.backgroundImage': 'none',
    'header.backgroundColor': 'transparent',
    'header.border': '0px',

    // load button
    'loadButton.backgroundColor': '#fff',
    'loadButton.border': '1px solid #ddd',
    'loadButton.color': '#222',
    'loadButton.fontFamily': 'NotoSans, sans-serif',
    'loadButton.fontSize': '12px',

    // download button
    'downloadButton.backgroundColor': '#fdba3b',
    'downloadButton.border': '1px solid #fdba3b',
    'downloadButton.color': '#fff',
    'downloadButton.fontFamily': 'NotoSans, sans-serif',
    'downloadButton.fontSize': '12px',

    // icons default
    'menu.normalIcon.color': '#8a8a8a',
    'menu.activeIcon.color': '#555555',
    'menu.disabledIcon.color': '#434343',
    'menu.hoverIcon.color': '#e9e9e9',
    'submenu.normalIcon.color': '#8a8a8a',
    'submenu.activeIcon.color': '#e9e9e9',

    'menu.iconSize.width': '24px',
    'menu.iconSize.height': '24px',
    'submenu.iconSize.width': '32px',
    'submenu.iconSize.height': '32px',

    // submenu primary color
    'submenu.backgroundColor': '#1e1e1e',
    'submenu.partition.color': '#858585',

    // submenu labels
    'submenu.normalLabel.color': '#858585',
    'submenu.normalLabel.fontWeight': 'lighter',
    'submenu.activeLabel.color': '#fff',
    'submenu.activeLabel.fontWeight': 'lighter',

    // checkbox style
    'checkbox.border': '1px solid #ccc',
    'checkbox.backgroundColor': '#fff',

    // rango style
    'range.pointer.color': '#fff',
    'range.bar.color': '#666',
    'range.subbar.color': '#d1d1d1',

    'range.disabledPointer.color': '#414141',
    'range.disabledBar.color': '#282828',
    'range.disabledSubbar.color': '#414141',

    'range.value.color': '#fff',
    'range.value.fontWeight': 'lighter',
    'range.value.fontSize': '11px',
    'range.value.border': '1px solid #353535',
    'range.value.backgroundColor': '#151515',
    'range.title.color': '#fff',
    'range.title.fontWeight': 'lighter',

    // colorpicker style
    'colorpicker.button.border': '1px solid #1e1e1e',
    'colorpicker.title.color': '#fff'
};

const dataURLtoFile = (base64, filename) => {
    const arr = base64.split(','),
        mime = arr
            .at(0)
            .match(/:(.*?);/)
            .at(1),
        bstr = atob(arr.at(1)),
        u8arr = new Uint8Array(bstr.length);
    let n = bstr.length;

    while (n--) u8arr[n] = bstr.charCodeAt(n);

    return new File([u8arr], filename, { type: mime });
};

export default () => {
    const [project, setProject] = useState(null);
    const { id } = useParams();
    const tuiRef = useRef();

    useEffect(() => {
        axios
            .get(`/projects/${id}`)
            .then(({ data }) => setProject(data))
            .catch((e) => console.error(e));
    }, []);

    const saveTUIObjects = (editorObjects)=> {
        let currentLayout = [];

        //Properties pick
        var modelProp = {
            aCoords:null, //Text
            lineCoords:null,
            angle:null,
            fontSize:null,
            fontWeight:null,
            fill:null,
            fontStyle:null,
            height:null,
            left:null,
            originX:null,
            originY:null,
            origins:null,
            value:null,
            rotatingPointOffset:null,
            text:null,
            textLines:null,
            textDecoration:null,
            top:null,
            underline:null,
            width:null,
            hasBorders:null, //Shape
            rx:null,
            ry:null,
            type:null,
            scaleX:null,
            scaleY:null,
            startPoint:null,
            stroke:null,
            strokeWidth:null,
            path:null,
            pathOffset:null,
            position:null,
            lockSkewingX:null,
            lockSkewingY:null,
        };

        for (let i = 0; i < editorObjects.length; i++) {
            // No way to add back line or path(could be done by images?)
            if (editorObjects[i].type != "path" && editorObjects[i].type != "line") {
                //Strip off not needed properties like "_", "__", canvas, mouseMoveHandler
                let filteredProp = _.pick(editorObjects[i], _.keys(modelProp));
                currentLayout.push(filteredProp);
            }

        }

        return currentLayout;
    }

    useEffect(() => {
        if (!tuiRef.current) return;

        const instance = tuiRef.current.getInstance();
        const downloadBtn = [...instance.ui._buttonElements.download].at(-1);

        downloadBtn.textContent = 'Save';

        instance.ui._actions.main.download = () => {
            const base64 = instance.toDataURL({ format: 'png' });
            const content = dataURLtoFile(base64, 'board.png'); // TODO: check file sanding
            let editorObjects = _.cloneDeep(instance._graphics.getCanvas().getObjects());
            console.log(editorObjects);

            let filteredObjects = saveTUIObjects(editorObjects)
            console.log(filteredObjects);

            const formData = new FormData();
            formData.append('content', content, 'board.png');
            formData.append('title', project.title);
            formData.append('public', project.public);
            formData.append('data', JSON.stringify(filteredObjects));
            axios
                .post(`/projects/${id}/save`, formData)
                .then((data) => console.log(data));

            // --------
            // const base64 = instance.toDataURL({ format: 'png' });
            // const content = dataURLtoFile(base64, 'board.png'); // TODO: check file sanding

            // console.log(base64);
            // console.log(content);

            // const formData = new FormData();

            // formData.append('title', project.title);
            // formData.append('public', project.public);
            // formData.append('content', base64);
            // formData.append('data', '[]');

            // axios
            //     .post(`/projects/${id}/save`, formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //         },
            //     })
            //     .then(
            //         ({ data }) => console.log(data)
            //         // TODO: uncomment on success
            //         // window.location.replace(
            //         //     `/projects/${data.id}/board`
            //         // )
            //     )
            //     .catch((e) => console.error(e));
        };
    }, [project]);

    return (
        <>
            {project ? (
                <ImageEditor
                    ref={tuiRef}
                    includeUI={{
                        loadImage: {
                            path: project.content ?? '/image.png',
                            name: 'image',
                        },
                        theme: customTheme,
                        menu: [
                            'shape',
                            'filter',
                            'text',
                            'mask',
                            'icon',
                            'draw',
                            'crop',
                            'flip',
                            'rotate',
                        ],
                        initMenu: 'filter',
                        uiSize: {
                            width: '100%',
                            height: 'calc(100% - 56px)',
                        },
                        menuBarPosition: 'left',
                    }}
                    cssMaxHeight={500}
                    cssMaxWidth={700}
                    selectionStyle={{
                        cornerSize: 20,
                        rotatingPointOffset: 70,
                    }}
                    usageStatistics={false}
                />
            ) : (
                <Loader />
            )}
        </>
    );
};
