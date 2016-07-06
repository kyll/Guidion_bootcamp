import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'bootstrap/dist/css/bootstrap.css';

import { name as ExpertsList } from '../imports/ui/components/expertsList/expertsList';
import { name as TicketsList } from '../imports/ui/components/ticketsList/ticketsList';
import { name as Matching } from '../imports/ui/components/matching/matching';

angular.module('bootcamp', [
  angularMeteor,
  ExpertsList,
  TicketsList,
  Matching
  ]);
