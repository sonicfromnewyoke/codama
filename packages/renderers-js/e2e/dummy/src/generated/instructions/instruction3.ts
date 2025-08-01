/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  transformEncoder,
  type AccountMeta,
  type Address,
  type FixedSizeCodec,
  type FixedSizeDecoder,
  type FixedSizeEncoder,
  type Instruction,
  type InstructionWithAccounts,
  type InstructionWithData,
  type ReadonlyUint8Array,
} from '@solana/kit';
import { DUMMY_PROGRAM_ADDRESS } from '../programs';

export const INSTRUCTION3_DISCRIMINATOR = 42;

export function getInstruction3DiscriminatorBytes() {
  return getU32Encoder().encode(INSTRUCTION3_DISCRIMINATOR);
}

export type Instruction3Instruction<
  TProgram extends string = typeof DUMMY_PROGRAM_ADDRESS,
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<TRemainingAccounts>;

export type Instruction3InstructionData = { discriminator: number };

export type Instruction3InstructionDataArgs = {};

export function getInstruction3InstructionDataEncoder(): FixedSizeEncoder<Instruction3InstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU32Encoder()]]),
    (value) => ({ ...value, discriminator: INSTRUCTION3_DISCRIMINATOR })
  );
}

export function getInstruction3InstructionDataDecoder(): FixedSizeDecoder<Instruction3InstructionData> {
  return getStructDecoder([['discriminator', getU32Decoder()]]);
}

export function getInstruction3InstructionDataCodec(): FixedSizeCodec<
  Instruction3InstructionDataArgs,
  Instruction3InstructionData
> {
  return combineCodec(
    getInstruction3InstructionDataEncoder(),
    getInstruction3InstructionDataDecoder()
  );
}

export type Instruction3Input = {};

export function getInstruction3Instruction<
  TProgramAddress extends Address = typeof DUMMY_PROGRAM_ADDRESS,
>(config?: {
  programAddress?: TProgramAddress;
}): Instruction3Instruction<TProgramAddress> {
  // Program address.
  const programAddress = config?.programAddress ?? DUMMY_PROGRAM_ADDRESS;

  const instruction = {
    programAddress,
    data: getInstruction3InstructionDataEncoder().encode({}),
  } as Instruction3Instruction<TProgramAddress>;

  return instruction;
}

export type ParsedInstruction3Instruction<
  TProgram extends string = typeof DUMMY_PROGRAM_ADDRESS,
> = {
  programAddress: Address<TProgram>;
  data: Instruction3InstructionData;
};

export function parseInstruction3Instruction<TProgram extends string>(
  instruction: Instruction<TProgram> & InstructionWithData<ReadonlyUint8Array>
): ParsedInstruction3Instruction<TProgram> {
  return {
    programAddress: instruction.programAddress,
    data: getInstruction3InstructionDataDecoder().decode(instruction.data),
  };
}
