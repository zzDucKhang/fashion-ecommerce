import { TagRepo } from './tag.repo'
import { CreateTagInput, UpdateTagInput } from './tag.schema'

export class TagService {
  constructor(private tagRepo = new TagRepo()) {}

  async getAllTags() {
    return this.tagRepo.findAll()
  }

  async getTagById(id: number) {
    const tag = await this.tagRepo.findById(id)
    if (!tag) throw new Error('Thẻ Tag không tồn tại')
    return tag
  }

  async createTag(input: CreateTagInput) {
    return this.tagRepo.create(input)
  }

  async updateTag(id: number, input: UpdateTagInput) {
    await this.getTagById(id)
    return this.tagRepo.update(id, input)
  }

  async deleteTag(id: number) {
    await this.getTagById(id)
    return this.tagRepo.delete(id)
  }
}