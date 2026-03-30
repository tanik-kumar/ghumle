import { Injectable } from '@nestjs/common';

import { AuditService } from '../../common/audit/audit.service';
import { AdminRepository } from './repositories/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly auditService: AuditService,
  ) {}

  overview() {
    return this.adminRepository.overview();
  }

  reports() {
    return this.adminRepository.reports();
  }

  async resolveReport(actorId: string, id: string) {
    const report = await this.adminRepository.resolveReport(id);
    await this.auditService.log(actorId, 'admin.report.resolved', 'ReportAbuse', id);
    return report;
  }

  faqs() {
    return [
      {
        id: 'faq_visa_1',
        question: 'How are visa notes generated?',
        answer: 'Phase 1 uses curated destination notes with future provider hooks for live visa validation.',
      },
      {
        id: 'faq_budget_1',
        question: 'How does budget ranking work?',
        answer: 'Ghumle blends budget fit, convenience, popularity, weather suitability, and value-for-money scoring.',
      },
    ];
  }
}
