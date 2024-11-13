import { container } from 'tsyringe';
import { MagicItemService } from '../../services/MagicItemService';
import { MagicMoverService } from '../../services/MagicMoverService';
import { MagicItemController } from 'controllers/MagicItemController';
import { MagicMoverController } from 'controllers/MagicMoverController';



container.register(MagicItemService, { useClass: MagicItemService });
container.register(MagicMoverService, { useClass: MagicMoverService });
container.register(MagicItemController, { useClass: MagicItemController });
container.register(MagicMoverController, { useClass: MagicMoverController });
