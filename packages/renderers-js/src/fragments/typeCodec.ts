import type { TypeNode } from '@codama/nodes';

import { GlobalFragmentScope } from '../getRenderMapVisitor';
import { TypeManifest } from '../TypeManifest';
import { Fragment, fragmentFromTemplate, mergeFragments } from './common';
import { getTypeDecoderFragment } from './typeDecoder';
import { getTypeEncoderFragment } from './typeEncoder';

export function getTypeCodecFragment(
    scope: Pick<GlobalFragmentScope, 'nameApi'> & {
        codecDocs?: string[];
        decoderDocs?: string[];
        encoderDocs?: string[];
        manifest: Pick<TypeManifest, 'decoder' | 'encoder'>;
        name: string;
        node: TypeNode;
        size: number | null;
    },
): Fragment {
    const { name, manifest, nameApi } = scope;
    const codecType = typeof scope.size === 'number' ? 'FixedSizeCodec' : 'Codec';
    return mergeFragments(
        [
            getTypeEncoderFragment({ ...scope, docs: scope.encoderDocs }),
            getTypeDecoderFragment({ ...scope, docs: scope.decoderDocs }),
            fragmentFromTemplate('typeCodec.njk', {
                codecFunction: nameApi.codecFunction(name),
                codecType,
                decoderFunction: nameApi.decoderFunction(name),
                docs: scope.codecDocs,
                encoderFunction: nameApi.encoderFunction(name),
                looseName: nameApi.dataArgsType(name),
                manifest,
                strictName: nameApi.dataType(name),
            }).addImports('solanaCodecsCore', [`type ${codecType}`, 'combineCodec']),
        ],
        renders => renders.join('\n\n'),
    );
}
