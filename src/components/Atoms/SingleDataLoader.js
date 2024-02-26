import { DotLoader } from 'components/Atoms/Loaders'

export const SingleDataLoader = ({ loading, data }) => (loading ? <DotLoader sizeInRem={0.6} /> : data ?? null)
