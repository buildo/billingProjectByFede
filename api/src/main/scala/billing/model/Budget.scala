package billing.model

import java.util.Date

case class Budget(title: String,
                  value: Option[String],
                  notes: Option[String],
                  defaultPricePerDay: Option[String],
                  costs: List[Cost],
                  lastUpdate: Option[String],
                  creationDate: Option[String])
