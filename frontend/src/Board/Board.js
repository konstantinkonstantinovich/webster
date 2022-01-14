import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import _ from 'lodash';

import { serverURL } from '../config';
import Loader from '../Misc/Loader';
import './index.css';
import { Container, Form } from 'react-bootstrap';

const customTheme = {
    'common.bi.image': '',
    'common.bisize.width': '251px',
    'common.bisize.height': '21px',
    'common.backgroundImage': 'none',
    'common.backgroundColor': '#f7f7f7',
    'common.border': '0px',

    // header
    'header.backgroundImage': 'none',
    'header.backgroundColor': 'transparent',
    'header.border': '0px',

    // load button
    'loadButton.backgroundColor': '#8b3dff',
    'loadButton.color': '#fff',
    'loadButton.borderRadius': '5px',
    'loadButton.fontSize': '15px',

    // download button
    'downloadButton.backgroundColor': '#8b3dff',
    'downloadButton.borderRadius': '5px',
    'downloadButton.color': '#fff',
    'downloadButton.border': 'none',
    'downloadButton.fontSize': '15px',

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
    'colorpicker.title.color': '#fff',
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
            .then(({ data }) => {
                const parsed = JSON.parse(data.data);

                setProject({
                    ...data,
                    content: `${serverURL}/api/image/${
                        data.content.split('/')[
                            data.content.split('/').length - 1
                        ]
                    }`,
                    data:
                        typeof parsed === 'string'
                            ? JSON.parse(parsed)
                            : parsed,
                });
            })
            .catch((e) => console.error(e));
    }, []);

    const saveTUIObjects = (editorObjects) => {
        const currentLayout = [];

        //Properties pick
        const modelProp = {
            aCoords: null, //Text
            lineCoords: null,
            angle: null,
            fontSize: null,
            fontWeight: null,
            fill: null,
            fontStyle: null,
            height: null,
            left: null,
            originX: null,
            originY: null,
            origins: null,
            value: null,
            rotatingPointOffset: null,
            text: null,
            textLines: null,
            textDecoration: null,
            top: null,
            underline: null,
            width: null,
            hasBorders: null, //Shape
            rx: null,
            ry: null,
            type: null,
            realType: null,
            scaleX: null,
            scaleY: null,
            startPoint: null,
            stroke: null,
            strokeWidth: null,
            path: null,
            pathOffset: null,
            position: null,
            lockSkewingX: null,
            lockSkewingY: null,
        };

        for (let i = 0; i < editorObjects.length; i++) {
            // No way to add back line or path(could be done by images?)
            if (
                editorObjects[i].type !== 'path' &&
                editorObjects[i].type !== 'line'
            ) {
                //Strip off not needed properties like "_", "__", canvas, mouseMoveHandler
                currentLayout.push(_.pick(editorObjects[i], _.keys(modelProp)));
            }

            // if (editorObjects[i]._element) {
            //     const id = editorObjects[i]._element.currentSrc
            //         .split('/')
            //         .at(-1);
            //     currentLayout[i].imageObject = {
            //         id,
            //         url: editorObjects[i]._element.currentSrc,
            //     };
            // }
        }

        return currentLayout;
    };

    useEffect(async () => {
        if (!tuiRef.current) return;

        const instance = tuiRef.current.getInstance();
        const downloadBtn = [...instance.ui._buttonElements.download].at(-1);

        downloadBtn.textContent = 'Save';

        console.log(project.data);

        const callWithDelay = (func, ...args) =>
            new Promise(
                (resolve) => setTimeout(() => resolve(func(...args)), 1000) // could be more
            );

        let selectedType = null;

        [...document.querySelectorAll('.tui-image-editor-button')].map((node) =>
            node.addEventListener(
                'click',
                (e) => (selectedType = e.currentTarget.dataset.icontype)
            )
        );

        instance.on('objectAdded', function (props) {
            console.log(props);

            if (props.type === 'icon') {
                instance.setObjectProperties(props.id, {
                    realType: selectedType,
                });
            }
        });

        Promise.allSettled(
            project.data.map((d) => {
                switch (d.type) {
                    case 'rect':
                    case 'circle':
                    case 'triangle':
                        return callWithDelay(
                            instance.addShape.bind(instance),
                            d.type,
                            d
                        );
                    case 'icon':
                        return callWithDelay(
                            instance.addIcon.bind(instance),
                            d.realType,
                            d
                        );
                    case 'i-text':
                        return callWithDelay(
                            instance.addText.bind(instance),
                            d.text,
                            {
                                styles: { ...d },
                                position: { ...d },
                                ...d,
                            }
                        );
                    // case 'image':
                    //     return callWithDelay(
                    //         instance.addImageObject.bind(instance),
                    //         d._originalElement.currentSrc,
                    //         {
                    //             styles: { ...d },
                    //             position: { ...d },
                    //             ...d,
                    //         }
                    //     );
                }
            })
        ).then(console.log);

        instance.ui._actions.main.download = () => {
            const editorObjects = _.cloneDeep(
                instance._graphics.getCanvas().getObjects()
            );
            console.log(editorObjects);

            const filteredObjects = saveTUIObjects(editorObjects);
            console.log(filteredObjects);

            const formData = new FormData();
            formData.append('title', project.title);
            formData.append('public', project.public);
            formData.append('data', JSON.stringify(filteredObjects));

            let objects = instance._graphics._canvas._objects;
            let keptObjects = [];
            for (let i = 0; i < objects.length; i++) {
                //Keep free drawing into the background image as we cannot updated it or add it back
                console.log('cleanCanvasForBackImgSave', objects[i].type);
                if (objects[i].type == 'path' || objects[i].type == 'line') {
                    keptObjects.push(objects[i]);
                }
            }
            instance._graphics._canvas._objects = keptObjects;

            const base64 = instance.toDataURL({ format: 'png' });
            const content = dataURLtoFile(base64, 'board.png'); // TODO: check file sanding
            formData.append('content', content, 'board.png');

            axios
                .post(`/projects/${id}/save`, formData)
                .then((data) => console.log(data))
                .catch((e) => console.error(e));
        };
    }, [project]);

    return (
        <>
            {project ? (
                <>
                    <Container
                        style={{
                            width: 248,
                            position: 'absolute',
                            top: 70,
                            left: 64,
                            zIndex: 9999,
                        }}
                    >
                        <Form
                            className="d-flex"
                            style={{ alignItems: 'center' }}
                        >
                            <Form.Label className="mb-0">Title:</Form.Label>
                            <Form.Control
                                value={project.title}
                                onChange={(e) =>
                                    setProject((project) => ({
                                        ...project,
                                        title: e.target.value,
                                    }))
                                }
                            />
                        </Form>
                    </Container>
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
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};
