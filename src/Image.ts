export class Image {
	public id: number;
	public tags: string[];
	public createdAt?: Date;
	public source?: string;
	public score: number;
	public fileURL: string;
	public fileSize?: number;
	public previewURL?: string;
	public sampleURL?: string;
	public rating: string;
	public width: number;
	public height: number;

	public constructor(protected data: any, private readonly site: string) {
		this.site = site;

		this.id = data.id;
		this.tags = (data.tags
			? data.tags.split(' ')
			: data.tag_string.split(' ').map((tag: string) => tag.replace(/,/g, '').replace(/ /g, ''))
		).filter((tag: string) => tag);
		this.createdAt = data.created_at
			? typeof data.created_at === 'number'
				? new Date(data.created_at * 1000)
				: new Date(data.created_at)
			: undefined;
		this.source = data.source;
		this.score = parseInt(data.score, 10);

		this.fileURL = data.file_url
			? data.file_url.match(/https?:\/\/lolibooru.moe/)
				? data.file_url.replace(/(.*).*(\/lolibooru).*(\..*)/, '$1$3')
				: data.file_url
			: `https://${this.site}/images/${data.directory}/${data.image}`;
		this.fileSize = data.file_size;

		this.previewURL = data.preview_file_url || data.preview_url;
		this.sampleURL =
			data.large_file_url ||
			(data.sample_url
				? data.sample_url.match(/https?:\/\/lolibooru.moe/)
					? data.sample_url.replace(/(.*).*(\/lolibooru).*(\..*)/, '$1$3')
					: data.sample_url
				: data.sample_url);

		this.rating = data.rating;

		this.height = data.height || data.image_height;
		this.width = data.width || data.image_width;
	}
}
