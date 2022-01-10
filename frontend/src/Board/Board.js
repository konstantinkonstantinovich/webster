import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import Loader from '../Misc/Loader';
import './index.css';

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

    useEffect(() => {
        if (!tuiRef.current) return;

        const instance = tuiRef.current.getInstance();
        const downloadBtn = [...instance.ui._buttonElements.download].at(-1);

        downloadBtn.textContent = 'Save';

        // Checkout instance for trace
        // console.log(instance);
        // console.log(downloadBtn);

        // const downloadTrigger = instance.ui._actions.main.download;
        // console.log(downloadTrigger.toString());

        instance.ui._actions.main.download = () => {
            const base64 = instance.toDataURL({ format: 'png' });
            const content = dataURLtoFile(base64, 'board.png'); // TODO: check file sanding

            console.log(base64);
            console.log(content);

            const formData = new FormData();

            formData.append('title', project.title);
            formData.append('public', project.public);
            formData.append('content', base64);
            formData.append('data', '[]');

            axios
                .post(`/projects/${id}/save`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(
                    ({ data }) => console.log(data)
                    // TODO: uncomment on success
                    // window.location.replace(
                    //     `/projects/${data.id}/board`
                    // )
                )
                .catch((e) => console.error(e));
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
                        menuBarPosition: 'bottom',
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
